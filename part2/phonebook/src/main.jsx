import ReactDOM from 'react-dom/client'

import App from './App'

const people = [
    { name: 'Ken Cula', number: '123', id: 1 },
    { name: 'Cindy Pan', number: '456', id: 2 },
    { name: 'Edward Zeltner', number: '789', id: 3 },
]

ReactDOM.createRoot(document.getElementById('root')).render(
<App people={people}/>)