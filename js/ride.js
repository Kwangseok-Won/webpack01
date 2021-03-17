(function ($) {

    var Ride = Backbone.Model.extend({
        defaults:{
            coverImage:"img/my_cycle.png",
            title:"2011년 대관령 대회",
            rider:"Yun YoungSik",
            ridingDate:"2011",
            keywords:"대관령 힐크라이밍 대회"
        }
    });

    var RideView = Backbone.View.extend({
        tagName:"div",
        className:"rideContainer",
        template:$("#rideTemplate").html(),

        render:function () {
        	//tmpl은 JSON객체를 받아서 html을 반환하는 함수이다.
            var tmpl = _.template(this.template); 
            //this.el은 tagName에 정의된 것이다. jQuery html() 함수를 사용하기 위해서는 $el을 쓴다.
            this.$el.html(tmpl(this.model.toJSON())); 
            return this;
        }, 

        events: {
            "click .delete": "deleteRide"
        },

        deleteRide:function () {
            //모델을 삭제한다.
            this.model.destroy();

            //뷰를 삭제한다.
            this.remove();
        }
    });

// 테스트로 한개 넣었던 코드에 대해서 주석처리한다.
/*    var ride = new Ride({
        title:"No title",
        rider:"Unknown",
        ridingDate:"Unknown",
        keywords:"empty"
    });

    var rideView = new RideView({
        model: ride
    });

    $("#rides").html(rideView.render().el);  */
    
    ////////////////////
    // rides 
    var rides = [{title:"대관령 힐크라이밍 대회", rider:"Yun YoungSik", ridingDate:"2010", keywords:"대관령"},
        {title:"미시령 힐크라이밍 대회", rider:"Yun DoWon", ridingDate:"2011", keywords:"미시령"},
        {title:"투어 드 코리아", rider:"Yun YoungSik", ridingDate:"2012", keywords:"코리아"}];

    ////////////////////
    // Ride Collection
    var Rides = Backbone.Collection.extend({
        model : Ride
    });

    ///////////////////
    // Collection View
    var RidesView = Backbone.View.extend({
        el: $("#rides"),

        initialize: function(){
            this.collection = new Rides(rides);
            this.render();
            // 컬렉션 add가 호출되면 renderRide를 trigger 한다 
            this.collection.on("add", this.renderRide, this);
            this.collection.on("remove", this.removeRide, this);
        },

        render: function(){
            var that = this;
            _.each(this.collection.models, function(item){
                that.renderRide(item);
            }, this);
        },

        renderRide: function(item){
            var rideView = new RideView({
                model: item
            });
            this.$el.append(rideView.render().el);
        },

        addRide: function(e){
            e.preventDefault();

            var formData = {};
            // jQuery의 each로 formData key=value 객체를 만듦
            $("#addRide").children("input").each(function (i, el) {
                if ($(el).val() !== "") {
                    formData[el.id] = $(el).val();
                }
            });

            // rides 배열에 저장
            rides.push(formData);
            // 컬렉션 객체에 저장 
            this.collection.add(new Ride(formData));
        }, 

        // 삭제된 모델을 인자로 자동 넣어준다 
        removeRide: function(removedRide){
            // attributes는 Model의 hash key=value object 이다 
            var removedRideData = removedRide.attributes;

            _.each(removedRideData, function(val, key){
                if(removedRideData[key] === removedRide.defaults[key]){
                    console.log(">> 1 : " + removedRideData[key]);
                    delete removedRideData[key];
                }
            });

            _.each(rides, function(ride){
                if(_.isEqual(ride, removedRideData)){
                    console.log(">> 2 : " + ride);
                    rides.splice(_.indexOf(rides, ride), 1);
                }
            });
        },
        
        // add버튼 누를때 이벤트 발생하여 addRide 메소드 호출
        events:{
            "click #add": "addRide"
        }
    });

    var ridesView = new RidesView();

})(jQuery);
