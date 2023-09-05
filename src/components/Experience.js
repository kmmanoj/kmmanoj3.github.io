import { Component } from "react";
import { Container, Header, Loader } from "semantic-ui-react";
import { VerticalTimeline, VerticalTimelineElement }  from "react-vertical-timeline-component";
import { MdWorkOutline, MdOutlineSchool } from "react-icons/md"

import { loadExperiencesFromContract, connectedAccounts } from "../web3fn.js";

import "semantic-ui-css/semantic.min.css";
import "react-vertical-timeline-component/style.min.css";
import { CONNECT_ACCOUNT, CONNECT_TO_SEPOLIA, GET_A_WALLET, Web3Error, Web3Info } from "./Web3Msg.js";

function ExperienceItem(props) {
    let description = props.description;
    if(props.description.indexOf(";") !== -1) {
        description = description.split(";").map((dsc, i) => <li key={i}>{dsc}</li>);
    }
    return (
        <VerticalTimelineElement
                className={`vertical-timeline-element--${props.expType}`}
                contentStyle={{ border: "1px solid #000" }}
                contentArrowStyle={{ borderRight: "7px solid #000" }}
                date={props.period}
                iconStyle={{ background: "#fff", border: "0px" }}
                icon={props.expType==="education"?<MdOutlineSchool />:<MdWorkOutline />}
            >
            <Header as="h3" style={{margin:0}}>{props.role}
                <Header.Subheader>{props.organization}</Header.Subheader>
            </Header>

            <p style={{margin:"10px 30px"}}>
                {description}
            </p>
        </VerticalTimelineElement>
    )
}

function ExperienceTimeline(props) {
    return (
        <VerticalTimeline lineColor="black" layout="1-column-left">
            {
                props.experiences.map(
                    (experience, i) => (
                        <ExperienceItem key={i} {...experience} />
                    )
                )
            }
        </VerticalTimeline>
    );
}

async function loadExperiences() {
    try {
        let experiences = await loadExperiencesFromContract();
        if(!experiences) return <Web3Info message={CONNECT_TO_SEPOLIA} />;
        if(experiences.length === 0) return <Web3Info message={"No experiences to display"} hideHeader={true} />;
        return <ExperienceTimeline experiences={experiences} />
    } catch(e) {
        return <Web3Error message={e.message} />
    }
}

export default class Experience extends Component {
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
                loadExperiences().then((content) => {
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
                    <Header as="h1">Experience</Header>
                    <a href="./CV.pdf">Download CV</a>
                </Container>
                {this.state.content}
            </div>
        );
    }
}