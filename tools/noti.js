import iziToast from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'

export default function () {
  iziToast.settings({
    position: 'center',
    timeout: 3000,

    class: '',
    progressBar: true,
    close: true,
    backgroundColor: '',
    messageColor: '',
    animateInside: true,
    maxWidth: ''
  })
  return iziToast
}
