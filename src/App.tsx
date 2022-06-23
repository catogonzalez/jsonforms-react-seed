import React, {Fragment} from 'react';
import {JsonForms} from '@jsonforms/react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import logo from './logo.svg';
import './App.css';
import {materialRenderers,} from '@jsonforms/material-renderers';

class App extends React.Component<{}, { schema: Object, uiSchema: Object, data: Object }> {
    renderers = [
        ...materialRenderers,
    ];

    constructor(props: any) {
        super(props);
        this.state = {schema: {}, uiSchema: {}, data: {}};
        // this.componentDidMount = this.componentDidMount.bind(this);
    }

    setData = (data: any) => {
        console.log('setData', JSON.stringify(data))
    };

    clearData = () => {
        this.setState({schema: {}, uiSchema: {}, data: {}});
    };

    componentDidMount() {
        fetch("http://127.0.0.1:8000/forms/questionnaires/",
            {mode: 'cors'})
            .then((res) => res.json())
            .then((json) => {
                this.setState({schema: json.results[0].as_json_schema, uiSchema: {}, data: {}});
            })
    }

    render() {
        return (
            <Fragment>
                <div className='App'>
                    <header className='App-header'>
                        <img src={logo} className='App-logo' alt='logo'/>
                        <h1 className='App-title'>Welcome to JSON Forms with React</h1>
                        <p className='App-intro'>More Forms. Less Code.</p>
                    </header>
                </div>

                <Grid
                    container
                    justifyContent={'center'}
                    spacing={1}
                    className='container'
                >
                    <Grid item sm={6}>
                        <Typography variant={'h4'} className='title'>
                            Bound data
                        </Typography>
                        <div className='dataContent'>
                            <pre id='boundData'>Not implemented</pre>
                        </div>
                        <Button
                            className='resetButton'
                            onClick={this.clearData}
                            color='primary'
                            variant='contained'
                        >
                            Clear data
                        </Button>
                    </Grid>
                    <Grid item sm={6}>
                        <Typography variant={'h4'} className='title'>
                            Rendered form
                        </Typography>
                        <div className='demoform'>
                            <JsonForms
                                schema={this.state.schema}
                                data={this.state.data}
                                renderers={this.renderers}
                            />
                        </div>
                    </Grid>
                </Grid>
            </Fragment>
        );
    }
}

export default App;
