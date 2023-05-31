import React, { useCallback, useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';
import Main from './Main';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';
import * as auth from '../utils/auth'

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});

  const [currentUser, setCurrentUser] = useState({});

  const [cards, setCards] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);
  const [isRegistrationOk, setIsRegistrationOk] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const cbAuthenticate = useCallback(data => {
    if (!data) {
      throw new Error('Ошибка аутентификации');
    }
    if (data) {
      localStorage.setItem('token', data.token);
      setLoggedIn(true);
      setUserEmail(data.email);
      navigate('/', { replace: true });
    }
  }, []);

  const cbLogin = useCallback(async ({ email, password }) => {
    try {
      const data = await auth
        .authorize(email, password);
      cbAuthenticate(data);
      setUserEmail(email);
    }
    catch (err) {
      console.log(`Ошибка: ${err}`);
      setIsRegistrationOk(false);
      handleInfoTooltipClick();
    }
    finally {
      setLoading(false);
    }
  }, []);

  function cbRegister(email, password) {
    setLoading(true)
    auth.register(email, password)
      .then((res) => {
        if (res.error) {
          throw new Error(res.error);
        }
        /* setLoggedIn(true); */
        setIsRegistrationOk(true);
        handleInfoTooltipClick();
        navigate('/sign-in', { replace: true });
        setUserEmail(email);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsRegistrationOk(false);
        handleInfoTooltipClick();
      })
      .finally(() => setLoading(false))
  }

  const cbLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('token')
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !loggedIn) {
      setLoading(true)
      auth.checkToken(token)
        .then((data) => {
          setUserEmail(data.email);
          setLoggedIn(true);
          navigate('/', { replace: true });

        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false);
    }
  }, [loggedIn]);


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !loggedIn) {
      api.getUserInfo()
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !loggedIn) {
      api.getInitialCards(cards)
        .then((res) => {
          setCards(res)
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }, []);

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setIsInfoTooltipOpen(false);
  };

  const handleEditProfileClick = () => {

    setIsEditProfilePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleInfoTooltipClick = () => {
    setIsInfoTooltipOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state
            .map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleCardDelete(idCard) {
    api
      .deleteCard(idCard)
      .then(() => {
        setCards((cards) => cards.filter((card) => card._id !== idCard));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleUpdateUser({ name, about }) {
    api
      .editUserInfo(name, about)
      .then(({ data }) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }

  function handleUpdateAvatar(newAvatar) {
    api
      .changeAvatar(newAvatar)
      .then(({ data }) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }

  const handleAddPlaceSubmit = (newData) => {
    api
      .addCard(newData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  };

  if (loading) {
    return 'Loading...'
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header onLogout={cbLogout} userEmail={userEmail} loggedIn={loggedIn} />
        <Routes>
          <Route path="/" element={<ProtectedRoute
            element={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
            loggedIn={loggedIn}
          />} />
          <Route path="/sign-in" element={<Login isLoggedId={loggedIn} onLogin={cbLogin} />}></Route>
          <Route path="/sign-up" element={<Register isLoggedId={loggedIn} onRegister={cbRegister} />}></Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups} />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <InfoTooltip
          onClose={closeAllPopups}
          isOpen={isInfoTooltipOpen}
          isSuccess={isRegistrationOk}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
