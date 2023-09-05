import { Message } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";

const CONNECT_TO_SEPOLIA = (
    <div>
        Please connect to Sepolia test network. Dont' know how? Read &nbsp;
        <u><a href="https://kmmanoj.hashnode.dev/a-visit-to-the-web30-world">
            this
        </a></u>
        &nbsp; blog article's "choose your destination" section to learn how.<br/><br/>
        <small>
            I dont want to take any fuss. Take me to <u><a href="https://www.kmmanoj.com">Web2.0 based website</a></u>!
        </small>
    </div>
);
const GET_A_WALLET = (
    <div>
        You can't come in without your blockchain wallet. Read &nbsp;
        <u><a href="https://kmmanoj.hashnode.dev/a-visit-to-the-web30-world">
            this
        </a></u>
        &nbsp; to create your wallet and join the party!<br/><br/>
        <small>
            I prefer web2 tech. Take me <u><a href="https://www.kmmanoj.com">there</a></u>!
        </small>
    </div>
);
const CONNECT_ACCOUNT = "Connect atleast one account to get started. Please refresh the page to try connecting an account!";

function Web3Error(props) {
    return (
        <Message negative>
            <Message.Header>Oh no!</Message.Header>
            <p>{props.message}</p>
        </Message>
    )
}

function Web3Info(props) {
    return (
        <Message info>
            {props.hideHeader?<span></span>:<Message.Header>Wait a minute ...</Message.Header>}
            <p>{props.message}</p>
        </Message>
    )
}

export {
    Web3Error,
    Web3Info,
    CONNECT_TO_SEPOLIA,
    GET_A_WALLET,
    CONNECT_ACCOUNT
}