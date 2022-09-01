export default class RenderHeader {

  static render() {
    const headerImage = document.querySelector('header img');
    headerImage.src = localStorage.getItem('@kenzie-habits:usrImage');
    headerImage.height = '40';
    headerImage.width = '40';
    headerImage.style.borderRadius = '50%';

    const avatar = document.querySelector('.avatar');
    avatar.src = localStorage.getItem('@kenzie-habits:usrImage');
    avatar.height = '60';
    avatar.width = '60';
    avatar.style.borderRadius = '50%';

    const h2 = document.querySelector('.nameAvatar');
    h2.innerText = localStorage.getItem('@kenzie-habits:usrName');

  }
}
