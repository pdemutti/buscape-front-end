var App = App || {};


App.Challenge = {
    setup: function() {
      App.Challenge.getData("/products");
      App.Challenge.getCartList();
      App.Challenge.bindItem();
      // App.Challenge.showCart();
      App.Challenge.updateLockIcon();
    },
    getData: function(url){
      axios.get(url).then(function(res) {
        App.Challenge.buildProductList(res);
      });
    },
    buildProductList: function(res) {
        var html = "<ul class='product-list'>";
          for (var key in res.data){
            var fullItem = res.data[key];
            var id = fullItem._id;
            var name = fullItem.name;
            var idItem = fullItem.id;
            var priceObj = fullItem.price;
            var priceValue = priceObj.value;
            var installments = priceObj.installments;
            var installmentValue = priceObj.installmentValue;
            var images = fullItem.images[0];

            html += "<li class='item' data-id='"+idItem+"'>";
              html += "<figure><img src="+images+" title="+name+" /></figure>";
              html += "<div class='product-item'>";
              html += "<span class='item-title'><p>" + name + "</p></span>";
              html += "<span class='wrap-hr'><hr></span>";
              html +=  "<div class='best-price'><p>Melhor preço</p></div>"
              html += "<div class='buy-box'>";
                html += "<div class='price-options'>";
                  html +=  "<div class='item-installment'><span class='how-many'>ou "+installments+"x de R$ </span><span class='installment-value'>"+installmentValue+"</span></div>"
                  html +=  "<div class='full-price'>ou <span class='price-value'>R$ "+priceValue+"</span> à vista</div>"
                html += "</div>";
                html +=  "<button class='add-bt' data-id='"+idItem+"' name='add bt'>Adicionar ao carrinho <span>&rsaquo;</span></button>"
                html += "</div>";
              html += "</div>";
            html +=  "</li>";
          }
        html +=  "</ul>";
        $('.store').append(html);
        App.Challenge.bindItem();
        App.Challenge.bindTgBt();
    },
    updateLockIcon: function(){
      var hasItemsOut = document.getElementsByClassName("has-items");
      var hasItemsInside = document.getElementsByClassName("header-cart");


      axios.get("/cart/").then(function(res) {
        $('.has-items, .header-cart').find(".badge, .lock").remove();

        var quantityVal = [];
        var data = res.data.items;
        if(data.length > 0){
          for (var prop in data) {
            quantityVal.push(data[prop].quantity);
          }
           var sum = quantityVal.reduce(function(a, b) {
            return a + b;
          }, 0);

          var html = "<i class='lock'></i>";
          html += "<span class='badge'>"+sum+"</span>";
          if (quantityVal){
            if(sum > 0){
              $(hasItemsOut).append(html);
              $(hasItemsInside).append(html);
            }
          }
          App.Challenge.bindTgBt();
        }
        else {
          var cart = $('#cart-list');
          cart.animate({"top":"-700"}, "fast").removeClass('visible').addClass('visible');
         }

      });
    },
    bindItem: function(){
      $('.product-list .add-bt').click(function(event){
         var id = this.getAttribute("data-id").toString();
          App.Challenge.addItemToCart(id);
      });
    },
    bindTgBt: function () {
      var hasItemICon = $('.has-items');
      hasItemICon.unbind().click(function(event){
        var cart = $('#cart-list');
        cart.slideToggle("fast").toggleClass('visible');
      });
    },
    showCart: function(){
      var cart = $('#cart-list');
      cart.animate({"top":"65px"}, "fast").toggleClass('visible');
      App.Challenge.bindTgBt();
    },
    addItemToCart: function(id){
      axios.get("/cart/add/"+id).then(function(res) {
        App.Challenge.buildCartItemMrkp(res);
        App.Challenge.updateLockIcon();
        App.Challenge.showCart();
      });
    },
    getCartList: function(){
      axios.get("/cart/").then(function(res) {
        App.Challenge.buildCartItemMrkp(res);
        // debugger
        if(res.data.items.length > 0){
          App.Challenge.showCart();
        }

      });
    },
    buildCartItemMrkp: function(res){
      var cartList = document.getElementById("cart");
      cartList.innerHTML = '';

      var sumcart = [];

      var items = res.data.items;
      for (var key in items){
        var singleItem = items[key],
            id = singleItem.id,
            name = singleItem.name,
            image = singleItem.image[0],
            price = singleItem.price,
            installments = singleItem.installments,
            qtd = singleItem.quantity,
            installmentsValue = singleItem.installmentsValue;
            sumcart.push(price * qtd);


          var html = "<li>";
            html += "<figure class='thumb'><img src="+image+" title="+name+" /></figure>";
            html += "<div class='details'>";
              html += "<span class='cart-item-title'>"+name+"</span>";
              html += "<div class='price-details'>";
                html += "<span class='cart-item-installments'>"+installments+"x de "+installmentsValue+"</span>";
                html += "<span class='cart-item-price'>Ou "+price+" à vista</span>";
                html += "<span class='cart-item-qtd'>Quantidade: "+qtd+"</span>";
              html += "</div>"
            html += "</div>"
            html += "<div class='action-area'>";
              html += "<span class='remove-bt'>X</span>";
            html += "</div>";
          html += "</li>";

        $('#cart-list ul').append(html);

        $('.remove-bt').click(function(event){
           App.Challenge.removeCartItem(id);
        });
      }

      App.Challenge.buildSubtotal(sumcart);
    },
    buildSubtotal: function(sumcart){
      var subtotal = $('#cart-list .subtotal')[0];
      subtotal.innerHTML = '';
      var sum = sumcart.reduce(add, 0);

      function add(a, b) {
        return a + b;
      }
      var installmentTotal = Math.round(sum/10).toFixed(2);

      html = "<div>Subtotal</div><hr>";
      html += "<div>10x de "+ installmentTotal +"</div>";
      html += "<div>ou R$ "+Math.round(sum).toFixed(2);+" à vista</div>";
      $('#cart-list .subtotal').append(html);
    },
    removeCartItem: function(id){
      axios.get("/cart/remove/" + id).then(function(res) {
       App.Challenge.buildCartItemMrkp(res);
       App.Challenge.getCartList();
       App.Challenge.updateLockIcon();
       App.Challenge.showCart();
     });
    }
};

App.Challenge.setup();
