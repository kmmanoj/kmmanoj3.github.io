import { Container, Segment, Header } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";

export default function SiteHeader() {
    return (
        <Segment size="massive" attached="top">
            <Container text>
                <Header size="huge">Manoj Vignesh K M</Header>
            </Container>
        </Segment>
    );
}