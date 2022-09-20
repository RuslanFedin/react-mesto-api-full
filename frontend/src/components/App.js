import { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Login from './Login';
import Register from './Register';
import Header from './Header';
import Main from './Main';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';
import union from '../images/Union.svg';
import unionError from '../images/Union-error.svg';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [image, setImage] = useState('');
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) { return }

    if (token) {
      auth.getContent(token)
        .then(res => {
          if(res) {
            setLoggedIn(true)
            setEmail(res.email)
            history.push('/')
          }
        })
        .catch(error => {
          console.log(`ERROR: ${error}`);
        })
    }
    return;
  }, [loggedIn, history])

  useEffect(() => {
    if (loggedIn) {
      api.getUserInfo()
      .then((data) => {
        setCurrentUser(data.user);
      })
      .catch((error) => {
        console.log(`ERROR: ${error}`);
      });

      api.getCards()
      .then(({card: cards}) => {
        setCards(cards.map((card) =>({...card, key: card._id})).reverse());
      })
      .catch((error) => {
        console.log(`ERROR: ${error}`);
      });
    }
  }, [loggedIn]);

  function onLogin({email, password}) {
    auth.authorize(email, password)
    .then((res) => {
      localStorage.setItem('token', res.token);
      setLoggedIn(true);
      setEmail(email);
      history.push('/');
    })
    .catch ((error) => {
      console.log(`ERROR: ${error}`);
    })
  }

  function handleSignOut() {
    localStorage.removeItem('token');
    setEmail('');
    setLoggedIn(false);
    history.push('/signin');
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipPopupOpen(false);
  }

  function handleUpdateUser(userData) {
    api.editUserInfo(userData)
      .then(({user}) => {
        setCurrentUser(user)
        closeAllPopups(setIsEditProfilePopupOpen)
      })
      .catch((error) => {
        console.log(`ERROR: ${error}`);
      });
  }

  function handleUpdateAvatar(link) {
    api.editUserAvatar(link)
      .then(({user}) => {
        setCurrentUser(user)
        closeAllPopups(setIsEditAvatarPopupOpen)
      })
      .catch((error) => {
        console.log(`ERROR: ${error}`);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((_id) => _id === currentUser._id);
    api.changeCardLike(card._id, !isLiked)
    .then(({card: newCard}) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((error) => {
      console.log(`ERROR: ${error}`);
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((error) => {
        console.log(`ERROR: ${error}`);
      });
  }

  function handleAddPlaceSubmit(newCardData) {
    api.createCard(newCardData)
      .then(({card}) => {
        setCards([card, ...cards])
        closeAllPopups(setIsAddPlacePopupOpen)
      })
      .catch((error) => {
        console.log(`ERROR: ${error}`);
      });
  }

  function onRegister({email, password}) {
    auth.register(email, password)
    .then((res) => {
      if (!res) {
        setIsInfoTooltipPopupOpen(true);
        setMessage('Что-то пошло не так! Попробуйте еще раз.');
        setImage(unionError);
        return;
      }
      setIsInfoTooltipPopupOpen(true);
      setMessage('Вы успешно зарегестрировались!');
      setImage(union);
      history.push('/signin');
    })
    .catch((error) => {
      console.log(`ERROR: ${error}`);
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          email = {email}
          loggedIn = {loggedIn}
          onSignOut = {handleSignOut}
        />
        <Switch>
          <Route exact={true} path="/signup">
            <Register
              onRegister={onRegister}
            />
          </Route>
          <Route exact={true} path="/signin">
            <Login
              onLogin={onLogin}
            />
          </Route>
          <ProtectedRoute
            exact={true}
            path="/"
            component={Main}
            loggedIn={loggedIn}
            onEditAvatar = {setIsEditAvatarPopupOpen}
            onEditProfile = {setIsEditProfilePopupOpen}
            onAddPlace = {setIsAddPlacePopupOpen}
            cards={cards}
            onCardClick = {setSelectedCard}
            onCardLike = {handleCardLike}
            onCardDelete = {handleCardDelete}
          >
          </ProtectedRoute>
        </Switch>
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
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
          card = {selectedCard}
          onClose = {closeAllPopups}
        />
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onCLose={closeAllPopups}
          image={image}
          message={message}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
