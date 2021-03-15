let Ride = Backbone.Model.extend({
  defaults: {
    title: "2011년 대관련 대회",
    rider: "Yun Youngsik",
    ridingDate: "2011",
    keywords: "대관령 힐크라이밍 대회"
  }
})

let RideView = Backbone.View.extend({
  tagName: "div",
  className: "rideContainer",
  template: $("#rideTemplate").html(),
  render: function () {
    let tmpl = _.template(this.template)
    this.$el.html(tmpl(this.model.toJSON()))
    return this
  }
})
let ride = new Ride({
  title: "Some title",
  rider: "Yun Dowon",
  ridingDate: "2011",
  keywords: "대관령 힐크라이밍 대회"
})
rideView = new RideView({
  model: ride
})
$('#rides').html(rideView.render().el)

module.exports = Ride