// index.js
import _ from 'lodash'
import './index.css'
import jQuery from 'jquery'
import backbone from 'backbone'

// import 'jqwidgets-framework/jqwidgets/jqxcore'
// import 'jqwidgets-framework/jqwidgets/jqx-all'
// import 'jqwidgets-framework/jqwidgets/jqxinput'

import './css/screen.css'
// import Ride from './js/ride'

(function ($) {
  $(() => {
    console.log('-jqwidgets-framework-')
    let countries = new Array("Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burma", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo, Democratic Republic", "Congo, Republic of the", "Costa Rica", "Cote d'Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Greenland", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Mongolia", "Morocco", "Monaco", "Mozambique", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Samoa", "San Marino", " Sao Tome", "Saudi Arabia", "Senegal", "Serbia and Montenegro", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "Spain", "Sri Lanka", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe");
    $("#input").jqxInput({ 
      placeHolder: "Enter a Country", 
      height: 30, 
      width: 250, 
      minLength: 1, 
      source: countries 
    });
    console.log('-jqwidgets-framework-')

    console.log('-')
    let bob = a => a + 100;
    (n) => {}

    /*
    * _.map
    * 함수형식: .map(collection, [iteratee =.identity], [thisArg])
    * 입력: collection
    * 출력: 계산한 결과 값의 배열
    */
    let timesThree = n => n * 3;
    console.log(_.map([1, 2], timesThree)) // → [3, 6]
    console.log(_.map({ 'a': 1, 'b': 2 }, timesThree)) // → [3, 6]
    let users = [
      {'user': 'barney'},
      {'user': 'fred'}
    ]
    console.log(_.map(users, 'user')) // key값만 집어넣을 경우 해당 value값들을 배열로 반환해줍니다.

    /*
    * _.reduce
    * 함수형식: .reduce(collection, [iteratee=.identity], [accumulator], [thisArg])
    * 입력: collection
    * 출력: 계산한 결과 값
    * 관련함수: _.reduceRight - 순서를 반대로 실행시키는 함수
    */
    // reduce는 콜백함수의 첫번째 인자로 전의 함수가 실행시킨 결과를 받습니다.
    // 그리고 함수가 모두 실행된 뒤에 결과를 반환합니다.
    _.reduce([1, 2], (total, n) => total + n)
    _.reduce({ 'a': 9, 'b': 2, 'key': 'value' }, (collection, value, key) => { 
      console.log('-')
      console.log('collection: ', collection)
      console.log('value: ', value)
      console.log('key: ', key)
      console.log('-')
      collection[key] = value * 3
      console.log('-')
      console.log('collection: ', collection)
      console.log('value: ', value)
      console.log('key: ', key)
      console.log('-')
      return collection
    }, {})
    console.log('-')



    window.HELP_IMPROVE_VIDEOJS = false

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

    console.log('-')
    let Song = Backbone.Model.extend({
      initialize: function () {
        console.log('initialize Song')
      }
    })
    let Album = Backbone.Model.extend({
      model: Song
    })
    let song1 = new Song({name: '1', artist: 'yhs'})
    let song2 = new Song({name: '2', artist: 'chj'})
    let song3 = new Song({name: '3', artist: 'sol'})
    let myAlbum = new Album([song1, song2, song3])
    console.log('-')
    console.log('-')
    let Book = Backbone.Model.extend({
      defaults: {
        sort: 'default',
        title: 'detault Title'
      }
    })
    let book1 = new Book({sort: 'Javascript', title: 'Hello'})
    let book2 = new Book({sort: 'Javascript', title: 'Javascript'})
    let book3 = new Book({sort: 'Javascript', title: 'Book'})

    let books = Backbone.Collection.extend({
      model: Book,
      initialize: function () {
        this.bind('add', function (book) {
          console.log(book.get('title') + '추가함')
        })
        this.bind('change:title', function (book) {
          console.log(book.get('title') + '변경')
        })
      },
      comparator: (book) => book.get('title').toLowerCase() // comparator 는 정렬을 해줍니다. // 인자로 model을 받게됩니다. // return 값을 model의 title을 소문자로 바꾼 걸로 해줍니다.
    })
    let booksCollection = new books()
    booksCollection.add([book1, book2, book3])
    console.log('booksCollection.models[0]: ', booksCollection.models[0])
    console.log('booksCollection.models[1]: ', booksCollection.models[1])
    console.log('booksCollection.models[2]: ', booksCollection.models[2])
    console.log('booksCollection.at(0): ', booksCollection.at(0))
    console.log('booksCollection.at(1): ', booksCollection.at(1))
    console.log('booksCollection.at(2): ', booksCollection.at(2))
    // book1.set({ title: 'test' })
    book1.set({ id: 0 })
    book2.set({ id: 1 })
    book3.set({ id: 2 })
    console.log('booksCollection.get(0): ', booksCollection.get(0))
    console.log('booksCollection.get(1): ', booksCollection.get(1))
    console.log('booksCollection.get(2): ', booksCollection.get(2))
    console.log('-')
    
    console.log('-')
    let ajaxBooks = Backbone.Collection.extend({
      url: 'codefactory.json'
    })
    let ajaxbooks = new ajaxBooks()
    ajaxbooks.fetch({
      data: {
        sort: 'JavaScript'
      },
      success: function () {
        console.log('-')
        console.log('success!')
        console.log('-')
      }
    })
    console.log('ajaxbooks: ', ajaxbooks)
    console.log('ajaxbooks.models: ', ajaxbooks.models)
    console.log('-')

    let Menus = Backbone.Collection.extend({
      url: 'lazydev.json'
    })
    let menus = new Menus()
    menus.fetch({
      data: {
        lazydev: 'lazydev'
      },
      success: function () {
        console.log('-')
        console.log('success!')
        console.log('-')
      }
    })
    console.log('menus: ', menus)
    console.log('menus.models: ', menus.models)
    console.log('-')

    console.log('-')
    let Person = Backbone.Model.extend({
      defaults: {
        name: 'yhs',
        age: 0,
        children: []
      },
      initialize: function () {
        this.bind('change:name', function () {
          let name = this.get('name')
          console.log('-')
          console.log('Changed my name to ' + name)
          console.log('-')
        })
      },
      replaceNameAttr: function (name) {
        this.set({name: name})
      }
    })
    let person = new Person({
      name: 'Thomas',
      age: 67,
      children: ['Ryan']
    })
    person.replaceNameAttr('Steve')
    let attributes = person.toJSON()
    console.log('attributes: ', attributes)
    console.log('-')

    console.log('- seye2 -')
    let Seye2 = Backbone.Model.extend({
      initialize: () => {
        console.log('Welcome to this world')
      }
    })
    let seye2 = new Seye2({
      name: 'Thomas',
      age: 67,
      children: ['Ryan']
    })
    let seye2Age = seye2.get('age')
    let seye2Name = seye2.get('name')
    let seye2Children = seye2.get('children')
    // delete seye2

    let SearchView = Backbone.View.extend({
      initialize: function () {
        this.render()
      },
      render: function () {
        let variables = {search_label: 'My Search'}
        let template = _.template($('#search_template').html(), variables)
        this.$el.html(template)
      },
      events: {
        'click button': 'doSearch'
      },
      doSearch: (event) => {
        console.log('search for ' + $('#search_input').val())
      }
    })
    let search_view = new SearchView({
      el: $('#search_container')
    })
    
    console.log('- seye2 -')

    let square = (num) => {
      return num * num
    }
    console.log(square(4))

    let basket = {
      _name: "ball",
      _mates: ["rebound", "shoot", "pass"],
      matesCount () {
        console.log('-')
        console.log(this)
        console.log('-')
        this._mates.forEach(f => console.log(this._name + " is " + f))
      }
    }
    basket.matesCount()

    class Shape {
      constructor () {}
    }
    class Rectangle extends Shape {
      constructor (w, h) {
        super(w, h)
        this.w = 20
        this.h = 10
      }
      getArea(w, h) {
        return w * h
      }
    }
    let rect = new Rectangle()
    console.log(rect.getArea(30, 20))
  })
}(jQuery))

document.addEventListener('DOMContentLoaded', () => {
  const you = "Chris", name = "Charles", surname = "Barkley"
  const tmp = `<p>Hello, ${you}. My name is ${name} ${surname}</p>`
  const el = document.getElementById("el")
  el.insertAdjacentHTML('beforeend', tmp)
})