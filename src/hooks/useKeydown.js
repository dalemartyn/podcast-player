import {
  useEffect
} from 'react'

export default function useKeydown(key, callback) {
  useEffect(() => {
    const handler = function (event) {
      if (event.target.tagName === "INPUT") {
        return;
      };
      if (event.key === key) {
        callback();
      }
    }
    window.addEventListener('keydown', handler)
    return () => {
      window.removeEventListener('keydown', handler)
    }
  }, [key, callback])
}
