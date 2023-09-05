import { Component } from "react";
import { Container, Header, Loader } from "semantic-ui-react";
import { VerticalTimeline, VerticalTimelineElement }  from "react-vertical-timeline-component";
import { MdBrokenImage } from "react-icons/md";
import { GiMaterialsScience } from "react-icons/gi";
import { AiOutlineYoutube } from "react-icons/ai";
import { TfiWrite } from "react-icons/tfi";

import { loadFeaturedWorkFromContract, connectedAccounts } from "../web3fn.js";

import "semantic-ui-css/semantic.min.css";
import "react-vertical-timeline-component/style.min.css";
import { CONNECT_TO_SEPOLIA, GET_A_WALLET, CONNECT_ACCOUNT, Web3Error, Web3Info } from "./Web3Msg.js";

function WorkItem(props) {
    let icon = undefined;
    switch(props.workType) {
        case "video": icon = <AiOutlineYoutube />; break;
        case "blog": icon = <TfiWrite />; break;
        case "research": icon = <GiMaterialsScience />; break;
        default: icon = <MdBrokenImage />;
    }
    return (
        <VerticalTimelineElement
                className={`vertical-timeline-element--${props.type}`}
                contentStyle={{ border: "1px solid #000" }}
                contentArrowStyle={{ borderRight: "7px solid #000" }}
                date={props.date}
                iconStyle={{ background: "#fff", border: "0px" }}
                icon={icon}
            >
            <Header as="h3" style={{margin:0}}>{props.title}</Header>

            <p style={{margin:"10px"}}>
                {props.description} <br/>
                <a href={props.url}>Read more</a>
            </p>
        </VerticalTimelineElement>
    )
}

function WorkTimeline(props) {
    return (
        <VerticalTimeline lineColor="black" layout="1-column-left">
            {
                props.works.map(
                    (work, i) => (
                        <WorkItem key={i} {...work} />
                    )
                )
            }
        </VerticalTimeline>
    );
}

async function loadFeaturedWork() {
    try {
        let works = await loadFeaturedWorkFromContract();
        if(!works) return <Web3Info message={CONNECT_TO_SEPOLIA} />;
        if(works.length === 0) return <Web3Info message={"No featured work to display"} hideHeader={true} />;
        return <WorkTimeline works={works} />
    } catch(e) {
        return {
            status: false,
            error: e.message
        }
    }
}

export default class Work extends Component {
    state = {
        content: <Loader active size="massive" inline style={{margin: "100px"}}/>
    };

    componentDidMount() {
        if(!window.ethereum) {
            this.setState({
                content: <Web3Info message={GET_A_WALLET} />
            });
            return;
        }
        connectedAccounts().then((accounts) => {
            if(accounts.length === 0) {
                this.setState({
                    content: <Web3Error message={CONNECT_ACCOUNT} />
                });
            } else {
                loadFeaturedWork().then((content) => {
                    this.setState({
                        content
                    });
                });
            }
        });
    }

    render() {
        return (
            <div>
                <Container text textAlign="justified">
                    <Header as="h1">Featured Work</Header>
                    <a href="https://kmmanoj.hashnode.dev">All work</a>
                </Container>
                {this.state.content}
            </div>
        );
    }
}