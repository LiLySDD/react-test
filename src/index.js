import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
/*root.render(
    <h1>Hello, world!</h1>
);*/
/*function tick() {
    const element = (
      <div>
          <h1>Hello, world!</h1>
          <h2>It is {new Date().toTimeString()}.</h2>
      </div>
    );
    root.render(element);
}

setInterval(tick, 1000);*/
/**
 * 函数组件
 * @param prop
 * @returns {JSX.Element}
 * @constructor
 */
function Welcome(prop) {
    return <h1>Hello, {prop.name}</h1>
}

/*function App() {
    return(
      <div>
          <Welcome name="Suxi" />
          <Welcome name="Pite" />
          <Welcome name="Hary" />
      </div>
    );
}*/

/**
 * 时钟类组件
 *
 */
class Clock extends React.Component {
    constructor(props) {
        super(props);
        // this.state.date = new Date()
        this.state = {date: new Date()};
        this.tick = this.tick.bind(this)
    }
    componentDidMount() {
        this.timeID = setInterval(
            () => this.tick(),
            1000
        );
    }
    componentWillUnmount() {
        clearInterval(this.timeID);
    }
    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        return(
            <div>
                <h1>Hello, World!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}</h2>
            </div>
        );
    }
}

/**
 * 用户切换开关状态
 */
class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {toggles: true}
        // this.clickEvent = this.clickEvent.bind(this)
    }
    clickEvent = () => {
        this.setState(state =>({
            toggles: !(state.toggles)
        }))
    }
    render() {
        return (
            <button onClick={this.clickEvent}>
                {this.state.toggles ? 'ON' : 'OFF'}
            </button>
        );
    }
}

/**
 * 与逻辑运算符
 */
function Mailbox(props) {
    const unMessage = props.unMessage
    return (
        <div>
            <h1>Hello!</h1>
            { unMessage.length > 0 &&
                <h2>You have { unMessage.length } unread Messages.</h2>
            }
        </div>
    )
}

const message = ['React', 'Re:React', 'Re:Re:React'];

/**
 * 组件根据值不进行渲染
 */
function WarningBanner(props) {
    if (!props.warn) {
        return null;
    }
    return (
        <div>
            Warning!
        </div>
    )
    /*if (props.warn) {
        return (
            <div>
                Warning!
            </div>
        )
    }*/
}
class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showWarning: true};
        this.change = this.change.bind(this)
    }
    change() {
        this.setState(state => ({
            showWarning: !state.showWarning
        }))
    }
    render() {
        return(
            <div>
                <WarningBanner warn={this.state.showWarning} />
                <button onClick={this.change}>
                    {this.state.showWarning ? 'hide' : 'show'}
                </button>
            </div>
        )
    }
}

/**
 * map
 */
const number = [1, 2, 3, 4, 5]
const listItem = number.map((item) => <li>{item}</li>)

/**
 * 多个受控组件
 */
class Reservation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isGoing: true,
            num: 0
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event) {
        const target = event.target;
        const value = target.name == 'isGoing' ? target.checked : target.value
        this.setState(state => ({
            [event.target.name]: value
        }))
    }
    render() {
        return(
            <form>
                <label>
                    参与：
                    <input name="isGoing" type="checkbox" checked={this.state.isGoing} onChange={this.handleChange} />
                </label>
                <label>
                    来宾人数：
                    <input name="num" type="number" value={this.state.num} onChange={this.handleChange}/>
                </label>
            </form>
        )
    }
}

/**
 * 华氏度和摄氏度温度相互转化----状态提升
 */
const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
}
//子组件
class Temperature extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)
        console.log('props',props)
    }
    handleChange(event) {
        this.props.handleChange(event.target.value)
    }
    render() {
        const scale = this.props.scale
        const temperature = this.props.temperature;
        return(
            <fieldset>
                <legend>Enter temperature in {scaleNames[scale]}</legend>
                <input value={temperature} onChange={this.handleChange}/>
            </fieldset>
        )
    }
}
//判断是否沸腾子组件
function BoilingVerdict(props) {
    if (props.celsius >= 100) {
        return <p>The water would boil.</p>;
    }
    return <p>The water would not boil.</p>;
}
//父组件
class Calculator extends React.Component {
    constructor(props) {
        super(props);

        this.setC = this.setC.bind(this)
        this.setF = this.setF.bind(this)
        this.state = {temperature: '', scale: 'c'}
    }
    toCelsius(fahrenheit) {
        return (fahrenheit - 32) * 5 / 9;
    }

    toFahrenheit(celsius) {
        return (celsius * 9 / 5) + 32;
    }
    tryConvert(temperature, convert) {
        const input = parseFloat(temperature);
        if (Number.isNaN(input)) {
            return '';
        }
        const output = convert(input);
        const rounded = Math.round(output * 1000) / 1000;
        return rounded.toString();
    }
    setC(temperature) {
        this.setState({scale: 'c', temperature})
    }
    setF(temperature) {
        this.setState({scale: 'f', temperature})
    }
    render() {
        const temperature = this.state.temperature
        const scale = this.state.scale
        const celsius = scale === 'f' ? this.tryConvert(temperature, this.toCelsius) : temperature
        const fahrenheit = scale === 'c' ? this.tryConvert(temperature, this.toFahrenheit) : temperature
        return(
            <div>
                <Temperature scale="c" temperature={celsius} handleChange={this.setC} />
                <Temperature scale="f" temperature={fahrenheit} handleChange={this.setF} />
                <BoilingVerdict
                    celsius={parseFloat(celsius)} />
            </div>
        )
    }
}

/**
 * context
 */
root.render(
    // <Mailbox unMessage={message} />
    // <Page />
    // <ul>{listItem}</ul>
    // <Reservation />
    // <Calculator />
    <App/>
);

/*<React.StrictMode>
    <App />
</React.StrictMode>*/
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
