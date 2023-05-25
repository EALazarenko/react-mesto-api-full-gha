import YesResult from '../images/YesResult.svg';
import NoResult from '../images/NoResult.svg';

const InfoTooltip = ({ isOpen, onClose, isSuccess }) => {

  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button type="button" className="popup__close" title="Закрыть" onClick={onClose} />
        <img
          src={isSuccess ? YesResult : NoResult}
          alt={isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
          className="popup__signup-icon"
        />
        <h3 className="popup__signup-title">
          {isSuccess
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </h3>
      </div>
    </div>
  )
}

export default InfoTooltip;
