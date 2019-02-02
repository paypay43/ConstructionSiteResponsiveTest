'use strict';

    var app = {}; // create namespace for our app

    // renders the full list of todo items calling TodoView for each one.
    app.HomeCatalogView = Backbone.View.extend({
      tagName: 'ul',
      el: '.homepage-catalog',
      initialize: function(){


      },
      render: function(){
        this.$el.html('<ul class="catalog-item-list"></ul>')
        return false;

      },

      addItem : function(options){
        var itemView = new app.HomeCatalogItemView(options);
        this.$el.append(itemView.render().el);

      }

    });

     app.HomeCatalogItemView = Backbone.View.extend({
      el: '.catalog-item-list',
      initialize: function(options){
        this.options = options;

      },
      render: function(){
        
        this.$el.append('<li style="list-style:none; text-align:center" class="catalog-item col-md-4"><img src="imgs/catalog/' + this.options.image + '" style="height:140px"><span class="catalog-item-text" style="text-align:center; display:block;">' + this.options.text + '<img class="catalog-arrow" src="imgs/catalog/catalog-arrow.png"></span></li>');
        return false;
      }

    });

     app.HomeInterestItemView = Backbone.View.extend({
      el: '.interest-item-list',
      initialize: function(options){
        this.options = options;

      },
      render: function(){
        
        this.$el.append('<li style="list-style:none; text-align:center" class="col-md-4">\
            <div class="interest-item">\
              <img class="interest-image" src="imgs/interests/' + this.options.image + '" style="">\
              <div class="interest-item-title">' + this.options.title + '</div>\
              <div class="interest-item-text" style="text-align:center; display:block;"><span>' + this.options.description + '</span></div>\
              <div class="interest-item-more"><a href="#item/' + this.options.slug + '">More Info</a><img class="catalog-arrow" src="imgs/catalog/catalog-arrow.png"></div>\
            </div>\
          </li>');
        return false;
      }

    });

     app.HomeInterestView = Backbone.View.extend({
      tagName: 'ul',
      el: '.homepage-interests',
      initialize: function(){


      },
      render: function(){
        this.$el.html('<ul class="interest-item-list row gutter-40"></ul>')
        return false;

      },

      addItem : function(options){
        var itemView = new app.HomeInterestItemView(options);
        this.$el.append(itemView.render().el);

      }

    });



    app.HomeView = Backbone.View.extend({
      el: '#primary',
      initialize: function () {

      },
      render: function(){
        
        var homeCatalog = new app.HomeCatalogView();
        this.$('.homepage-catalog').html(homeCatalog.render().el);
        homeCatalog.addItem({'image' : 'backhoe.png', text: 'Backhoe Loaders'});
        homeCatalog.addItem({'image' : 'dozer.png', text: 'Dozers'});
        homeCatalog.addItem({'image' : 'excavator.png', text: 'Excavators'});
        homeCatalog.addItem({'image' : 'mini.png', text: 'Mini Excavators'});
        homeCatalog.addItem({'image' : 'skid.png', text: 'Skid Steers'});
        homeCatalog.addItem({'image' : 'tool.png', text: 'Tools'});
        homeCatalog.addItem({'image' : 'tractor.png', text: 'Tractors'});
        homeCatalog.addItem({'image' : 'wheel.png', text: 'Wheel Loaders'});

        var homeInterest = new app.HomeInterestView();
        this.$('.homepage-interests').html(homeInterest.render().el);
        homeInterest.addItem({'image': 'interest1.png', 'slug' : 'jon_deere_410e', 'title' : 'JOHN DEERE 410E', 'description' : 'Four wheel drive backhoe with extendahoe and lorum ipsum dolor amat sit quand donc quand gavant tiemps…'});
        homeInterest.addItem({'image': 'interest2.png', 'slug' : 'jon_deere_410e', 'title' : 'CAT 308 EXCAVATOR', 'description' : 'The Cat 308 Mini Hydraulic Excavator delivers high performance with with the versatility of a swing boom…'});
        homeInterest.addItem({'image': 'interest3.png', 'slug' : 'jon_deere_410e', 'title' : 'BOBCAT 331 COMPACT EXCAVATOR', 'description' : 'A mainstay in the Bobcat compact excavator lineup, the 331 exceeds expectations…'});

        return false;
      },
      
    });

    app.ContactView = Backbone.View.extend({
      el: '#primary',
      initialize: function () {
  
      },
      render: function(){
         var template = _.template($('#contact-template').html())
         this.$el.html(template);
         var latlng = new google.maps.LatLng(41.8475379,-72.6000714);
        var mapOptions = {
          zoom: 18,
          scrollwheel: false,
          center: latlng,
          
        }

        var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
        var marker = new google.maps.Marker({
          position:  latlng,
          map: map,
          icon: '/imgs/mapmarker.png',
          title: "Arnold's Rentals • Bobcat & Excavator Rentals"
        });

    var companyDetails = "<h3>Arnold's Rentals</h3>Bobcat & Excavator Rentals";


        var infowindow = new google.maps.InfoWindow({
          content: companyDetails,
          position: latlng,
          map: null  // first set it to null, only show it after a click on the marker
        });
        // when the user clicks on the marker, the infowindow will appear
        marker.addListener('click', function() {
          infowindow.setMap(map);
        });


         return false;
        
      },
      
    });

      app.CategoryView = Backbone.View.extend({
      el: '#primary',
      events:{
      },
      initialize: function (options) {
        this.options = options;
      },
      render: function(){

         var homeInterest = new app.HomeInterestView();
        $('#category').html(homeInterest.render().el);

        var topTemplate = '<div class="category-row">' + this.options.title + '</div>';
        topTemplate += '<div class="container category-sort"><div class="col-md-9">\
          <span class="sort-text">Sort By:</span><ul class="nav nav-justified nav-pills">\
  <li data-toggle="pill" style="border-right:1px solid #e5e5e5" role="presentation" class="active"><a>Featured</a></li>\
  <li data-toggle="pill" style="border-right:1px solid #e5e5e5" role="presentation"><a >Name<span class="sort-sub">(A-Z)</span></a></li>\
   <li data-toggle="pill" style="border-right:1px solid #e5e5e5" role="presentation"><a>Name<span class="sort-sub">(Z-A)</span></a></li>\
  <li data-toggle="pill" style="border-right:1px solid #e5e5e5" role="presentation"><a>Price<span class="sort-sub">(Low to High)</span></a></li>\
  <li data-toggle="pill" role="presentation"><a >Price<span class="sort-sub">(High to Low)</span></a></li>\
</ul>\
        </div></div>';

        $("#category").prepend(topTemplate);

        homeInterest.addItem({'image': 'interest1.png', 'slug' : 'jon_deere_410e', 'title' : 'JOHN DEERE 410E', 'description' : 'Four wheel drive backhoe with extendahoe and lorum ipsum dolor amat sit quand donc quand gavant tiemps…'});
        homeInterest.addItem({'image': 'interest2.png', 'slug' : 'jon_deere_410e', 'title' : 'CAT 308 EXCAVATOR', 'description' : 'The Cat 308 Mini Hydraulic Excavator delivers high performance with with the versatility of a swing boom…'});
        homeInterest.addItem({'image': 'interest3.png', 'slug' : 'jon_deere_410e', 'title' : 'BOBCAT 331 COMPACT EXCAVATOR', 'description' : 'A mainstay in the Bobcat compact excavator lineup, the 331 exceeds expectations…'});
        homeInterest.addItem({'image': 'interest1.png', 'slug' : 'jon_deere_410e', 'title' : 'JOHN DEERE 410E', 'description' : 'Four wheel drive backhoe with extendahoe and lorum ipsum dolor amat sit quand donc quand gavant tiemps…'});
        homeInterest.addItem({'image': 'interest2.png', 'slug' : 'jon_deere_410e', 'title' : 'CAT 308 EXCAVATOR', 'description' : 'The Cat 308 Mini Hydraulic Excavator delivers high performance with with the versatility of a swing boom…'});
        homeInterest.addItem({'image': 'interest3.png', 'slug' : 'jon_deere_410e', 'title' : 'BOBCAT 331 COMPACT EXCAVATOR', 'description' : 'A mainstay in the Bobcat compact excavator lineup, the 331 exceeds expectations…'});

        

         return false;
        
      },
      
    });

    app.ItemView = Backbone.View.extend({
      el: '#primary',
      initialize: function (options) {
        this.options = options;

        if(this.options.slug=='jon_deere_410e'){
          this.options.image = "item1.png";
          this.options.price = '129';
          this.options.description = 'The Cat 308 Mini Hydraulic Excavator delivers high performance with the versatility of a swing boom front linkage in a durable Compact Radius design to help you work in the tightest applications. With the COMPASS display panel, Tier 4 Final engine and new hydraulic system, the 308 is more productive, versatile and cost effective!';
        }
      },
      render: function(){

        var template = '<div style="height:700px;" class="item_image">\
                        </div>\
                        <div style="    display: flex; justify-content:center;    text-align: center;padding-top: 50px;background-color: #fff;" class="row">\
                        <div class="item-info-header col-md-10 align-self-center"><h2 style="text-align:center"><hr style="border-top:1px solid #d8d8d8">\
                        <span id="item-header">Starting At: $' + this.options.price + ' / Day</span></h2>\
                        <div class="item-description">' + this.options.description + '</div>\
                        </div>\
                        </div>';
        


        $("#item").html(template);
        $('.item_image').css('background-image', 'url("imgs/item_images/' + this.options.image + '"');
            

        var featuresTemplate = '<section class="item-page" id="item_features">\
          <div class="container">\
            <h2 style="text-align:center">Key Features</h2>\
            <div style="text-align:center" class="col-md-12 feature-list">\
            <div class="feature-column col-md-6" style="border-right:1px solid #e9e9e9">\
              <div>lorem ipsum</div>\
              <div>lorem ipsum</div>\
              <div>lorem ipsum</div>\
              <div>lorem ipsum</div>\
            </div>\
            <div class="feature-column col-md-6">\
            <div>lorem ipsum</div>\
            <div>lorem ipsum</div>\
            <div>lorem ipsum</div>\
            </div>\
            </div>\
        </div></section>';
        $('#item').after(featuresTemplate);

        var specsTemplate = '<section class="item-page" id="item_specs">\
        <div class="container">\
        <h2 style="text-align:center"><hr style="border-top:1px solid #d8d8d8">\
                        <span id="item-header">Tech Specs</span></h2>';

        specsTemplate += '<div style="float:none; margin:0 auto" class="col-md-8"><table class="table table-striped">\
    <thead>\
      <tr>\
        <th>Overview:</th>\
        <th></th>\
      </tr>\
    </thead>\
    <tbody>\
      <tr>\
        <td>Digging Force: </td>\
        <td>2000 lb</td>\
      </tr>\
      <tr>\
        <td>Operating Weight</td>\
        <td>3000 lb</td>\
      </tr>\
      <tr>\
      </tr>\
    </tbody>\
  </table>\
  <table style="margin-top:50px" class="table table-striped">\
  <thead>\
      <tr>\
        <th>Engine:</th>\
        <th></th>\
      </tr>\
    </thead>\
    <tbody>\
      <tr>\
        <td>Digging Force: </td>\
        <td>2000 lb</td>\
      </tr>\
      <tr>\
        <td>Operating Weight</td>\
        <td>3000 lb</td>\
      </tr>\
      <tr>\
      </tr>\
    </tbody>\
  </table></div></div></section>';
        $('#item_features').after(specsTemplate);
        //$("#primary").append("<section id='item_features'></section>");

         var homeInterest = new app.HomeInterestView();
        this.$('.homepage-interests').html(homeInterest.render().el);
        homeInterest.addItem({'image': 'interest1.png', 'slug' : 'jon_deere_410e', 'title' : 'JOHN DEERE 410E', 'description' : 'Four wheel drive backhoe with extendahoe and lorum ipsum dolor amat sit quand donc quand gavant tiemps…'});
        homeInterest.addItem({'image': 'interest2.png', 'slug' : 'jon_deere_410e', 'title' : 'CAT 308 EXCAVATOR', 'description' : 'The Cat 308 Mini Hydraulic Excavator delivers high performance with with the versatility of a swing boom…'});
        homeInterest.addItem({'image': 'interest3.png', 'slug' : 'jon_deere_410e', 'title' : 'BOBCAT 331 COMPACT EXCAVATOR', 'description' : 'A mainstay in the Bobcat compact excavator lineup, the 331 exceeds expectations…'});


         return false;
        
      },
      
    });

    //--------------
    // Routers
    //--------------
    app.Router = Backbone.Router.extend({
      routes: {
        '' : 'showHome',
        'contact' : 'showContact',
        'categories/:slug' : 'showCategories',
        'item/:slug' : 'showItem',
      },
      showHome: function(){
        app.currentView = new app.HomeView();
        if(!$("nav #nav-home").hasClass('active')){
          $("nav .active").removeClass('active');
          $("nav #nav-store").addClass('active');
        }
        $("#primary").html(app.currentView.render().el);
      },
      showContact: function(){
        app.currentView = new app.ContactView();
        $("nav .active").removeClass('active');
        $("nav #nav-contact").addClass('active');
        $('.nav-home').remove();
        $('#primary').css('margin-top', '100px');
        $("#primary").html(app.currentView.render().el);
      },

      showCategories: function(slug){
        var title;
        if(slug=='backhoe_loaders'){
          title = 'Backhoe Loaders';
        }else if(slug=='dozers'){
          title = 'Dozers';
        }
        app.currentView = new app.CategoryView({slug: slug, title: title});
        this.hideViews();
                $('#interested').remove();
        $("#primary").prepend('<section id="category"><div style="padding-top:50px" class="homepage-interests"></div></section">');
        $("#primary").html(app.currentView.render().el);
      },

      showItem: function(slug){
          app.currentView = new app.ItemView({slug: slug});
        this.hideViews();
        $("#primary").prepend('<section class="item-page" id="item"></section">');
        $("#primary").html(app.currentView.render().el);
      },

      hideViews: function(){
        $(".item-page").remove();
          $('#slider').remove();
        $('#rental').remove();
        $("#category").remove();
      }
    })

    //--------------
    // Initializers
    //--------------   

$(document).ready( function(){
    app.router = new app.Router();
    Backbone.history.start();   

    $('#navbar-collapse-1').on('hide.bs.collapse', function () {
  // do something…
      $('.nav-home').animate({top:120},250);
    });

    $('#navbar-collapse-1').on('show.bs.collapse', function () {
         $('.nav-home').animate({top:444},300);
    });

    var width = $(window).width();
    $(window).on('resize', function(){
       if($(this).width() != width){
          width = $(this).width();
        }
        if(width>884){
          $('.nav-home').css('top', '120px');
          $('#navbar-collapse-1').collapse('hide');
        }
    });

  }); 
