import iziToast from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import '../scss/noti-m.scss'

export default function () {
  iziToast.settings({
    position: 'center',
    timeout: 3000,

    icon: '',
    class: 'iziToast--mobile',
    progressBar: false,
    close: false,
    backgroundColor: 'rgba(0,0,0,0.8)',
    messageColor: '#FFFFFF',
    animateInside: false,
    maxWidth: '70%'
  })
  return iziToast
}
