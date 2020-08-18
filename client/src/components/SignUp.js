import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import {connect} from 'react-redux'
import {compose} from 'redux'
import FacebookLogin from 'react-facebook-login'
import GoogleLogin from 'react-google-login'

import CustomInput from './CustomInput'

import {signUp, oauthGoogle} from '../redux/actions'

class SignUp extends Component {

    onSubmit=async (formData)=>{
        console.log('on submit got called', formData)
        await this.props.signUp(formData)
    }

    responseGoogle = async (res) =>{
        console.log('responseGoogle', res)
        await this.props.oauthGoogle(res.accessToken)
    }

    responseFacebook = (res) =>{
        console.log('responseFacebook', res)
    }

    render() {
        const {handleSubmit} = this.props
        console.log('signup state->',this.props.auth)
        return (
            <div className="row">
                <div className="col">
                    <form onSubmit={handleSubmit(this.onSubmit)}>
                        <fieldset>
                            <Field
                                name="email"
                                type="text"
                                id="email"
                                label="Enter your email"
                                placeholder="example@example.com"
                                component={CustomInput}
                                />
    
                        </fieldset>
                        <fieldset>
                            <Field
                                name="password"
                                type="password"
                                id="password"
                                label="Enter your password"
                                placeholder="password..."
                                component={CustomInput}
                                />
                        </fieldset>

                        { this.props.auth.errorMessage ?
                            <div className='alert alert-danger'>
                                {this.props.auth.errorMessage}
                            </div>:
                            null 
                        }
                        <button type="submit" className="btn btn-primary">Sign Up</button>
                    </form>  
                </div>
                <div className="col">
                    <div className="text-center">                    
                        <div className="alert alert-primary">
                            or sign up using third-part services
                        </div>
                        <FacebookLogin 
                            appId="225740402105931"
                            autoLoad={true}
                            textButton="Facebook"
                            fields="name,email,picture"
                            callback={this.responseFacebook}
                            cssClass='btn btn-outline-primary'
                        />                        
                        <GoogleLogin
                            clientId="36830242812-9pu65p9ju8fi493j731m9855fg5siu3u.apps.googleusercontent.com"
                            buttonText="Google"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            className="btn btn-primary-outline"

                        />
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state =>({auth:state.auth})

const mapDispatchToProps = dispatch =>({signUp:(data) => dispatch(signUp(data)),
oauthGoogle:data=> dispatch(oauthGoogle(data))})

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({form:'signup'})
)(SignUp)
