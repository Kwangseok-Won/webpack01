// index.js
import _ from 'lodash'
import './index.css'
import jQuery from 'jquery'
import backbone from 'backbone'

(function ($) {
  $(function () {

    window.HELP_IMPROVE_VIDEOJS = false

    console.log('1')
    console.log('2')

    // console.log(path.join(__dirname, './'))

    let testModel = Backbone.Model.extend({
      defaults: {
        keyOne: 'defaultValueOne',
        keyTwo: 'defaultValueTwo'
      },
      initialize: function () {
        console.log('model 초기화')
        this.bind('change:keyOne', function () {
          console.log('keyOne이(가) ' + this.get('keyOne') + '(으)로 변경됨')
        })
      },
      customOne: function (customParam) {
        this.set({ customKey: customParam })
      }
    })
    let modelOne = new testModel
    console.log(modelOne.get('keyOne')) // defaultValueOne
    console.log(modelOne.get('keyTwo')) // defaultValueTwo
    let modelTwo = new testModel({
      // defaults에 있는 값 변경
      keyOne: 'valueOne',
      keyTwo: 'valueTwo'
    })
    console.log(modelTwo.get('keyOne')) // valueOne
    console.log(modelTwo.get('keyTwo')) // valueTwo
    modelTwo.set({ newKeyOne: 'newValueOne' })
    console.log(modelTwo.get('newKeyOne')) // newValueOne
    modelTwo.customOne('customOneParam')
    console.log(modelTwo.get('customKey')) // customOneParam
  })
}(jQuery))
