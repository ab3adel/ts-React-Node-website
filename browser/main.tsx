import ReactDOM, { hydrate,render } from 'react-dom'
import React from 'react'
import App from '../shared/components/app'
import {BrowserRouter as Router} from 'react-router-dom'
import {CookiesProvider} from 'react-cookie'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import myreducer from '../src/reducer'
import  '../shared/css/main.css';
import '../shared/css/auth.css'
import '../shared/css/shop.css'
import '../shared/css/category.css'
import '../shared/css/profile.css'
import '../shared/css/admin.css'

declare var __is_browser__:boolean;
let methode=__is_browser__? render :hydrate
delete (Window as any). __user__;
const preloadData= (Window as any). __user__
const mystore = createStore(myreducer,preloadData)
methode(<Provider store={mystore}> <Router><CookiesProvider><App/></CookiesProvider></Router></Provider>,document.getElementById('root'))