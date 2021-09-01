import React from 'react'
import { CardHeader, Grid, CardContent, Card, Button } from '@material-ui/core';
import { CSSTransition, TransitionGroup } from "react-transition-group";

const PageWrapper = ({ children, title }) => {
    return (
        <TransitionGroup>
            <CSSTransition classNames="slide" timeout={{ enter: 1000, exit: 1000 }} key={title}>
                <Grid container justifyContent="center" alignItems="center">
                    <Card raised style={{ width: '30rem' }}>
                        <CardHeader title={title} style={{ textAlign: 'center' }} />
                        <CardContent style={{ textAlign: 'center' }}>
                            {children}
                        </CardContent>
                    </Card>
                </Grid>
            </CSSTransition>
        </TransitionGroup>
    )
}

export default PageWrapper;