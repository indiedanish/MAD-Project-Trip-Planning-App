import React from 'react';
import renderer from 'react-test-renderer';

import Home from './screens/Home';

import 'react-native'


test("Home snapShot",()=>{


    const snap = renderer.create(
        <Home/>
    ).toJSON()

    expect(snap).toMatchSnapShot()
})