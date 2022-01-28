import './App.css';
import { ExpressionInput } from './ExpressionInput/ExpressionInput'

function App() {
  return (
    <div>
      Current supported symbols:
      <ul>
        <li>\land</li>
        <li>\lor</li>
        <li>\lnot</li>
        <li>\oplus</li>
        <li>\implies</li>
        <li>\iff</li>
        <li>T for true</li>
        <li>F for false</li>
      </ul>
      <ExpressionInput />
    </div>
  );
}

export default App;
