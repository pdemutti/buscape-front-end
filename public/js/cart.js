var App = App || {};


App.Challenge = {
    setup: function() {
      App.Challenge.getData("/products");
      App.Challenge.getCartList();
      App.Challenge.bindItem();
      App.Challenge.updateLockIcon();
      App.Challenge.hiddenCart();
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
            // var priceBig = fullItem.price.toString().split(".")[0];
            // var priceDecimal = fullItem.price.toString().split(".")[1];
              // for (var img in images){
              //   html += "<li><img src="+images+" alt='' /></li>";
              // }
            html += "<li class='item' data-id='"+idItem+"'>";
              html += "<figure><img src="+images+" alt='' /></figure>";
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
    },
    updateLockIcon: function(){
      var hasItemsOut = document.getElementsByClassName("has-items");
      var hasItemsInside = document.getElementsByClassName("header-cart");

      $('.has-items, .header-cart').find(".badge, .lock").remove();

      axios.get("/cart/").then(function(res) {
         var quantityVal = [];
        var data = res.data.items;
        if(data){
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
              $('body').find(".has-items").click(function(){
                App.Challenge.showCart();
              });
            }
          }
        }
        else {
          var cart = $('#cart-list');
          cart.animate({"right":"-700"}, "fast").removeClass('visible');
         }

      });
    },
    bindItem: function(){
      $('.product-list .add-bt').click(function(event){
         var id = this.getAttribute("data-id").toString();
          App.Challenge.addItemToCart(id);
          App.Challenge.showCart();
      });
    },
    showCart: function(){
      // var cart = $('#cart-list');
      // debugger
      //
      //  if (cart.style.display === 'none') {
      //     //  cart.style.display = 'block';
      //     //  cart.animate({"top":"65px"}, "fast").addClass('visible');
      //  } else {
      //      cart.style.display = 'none';
      //     //  cart.animate({"top":"65px"}, "fast").addClass('visible');
      //
      //  }
      var cart = $('#cart-list');
      cart.animate({"top":"65px"}, "fast").addClass('visible');
    },
    hiddenCart: function(){
      var cart = $('#cart-list');
      $('.toogle-cart').click(function(){
        cart.animate({"top":"-675px"}, "fast").toggleClass('visible');
      })
    },
    addItemToCart: function(id){
      axios.get("/cart/add/"+id).then(function(res) {
        App.Challenge.buildCartItemMrkp(res);
        App.Challenge.updateLockIcon();
      });
    },
    getCartList: function(){
      axios.get("/cart/").then(function(res) {
        App.Challenge.buildCartItemMrkp(res);
      });
    },
    buildCartItemMrkp: function(res){
      var cartList = document.getElementById("cart");
      cartList.innerHTML = '';

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



        var html = "<li>";
          html += "<figure class='thumb'><img src="+image+" /></figure>";
          html += "<div class='details'>";
            html += "<span class='cart-item-title'>"+name+"</span>";
            html += "<div class='price-details'>";
              html += "<span class='cart-item-installments'>"+installments+"x de "+installmentsValue+"</span>";
              html += "<span class='cart-item-price'>Ou "+price+" à vista</span>";
              html += "<span class='cart-item-qtd'>Quantidade: "+qtd+"</span>";
            html += "</div>"
          html += "</div>"
          html += "<div class='action-area'>";
            html += "<span class='remove-bt' onclick='App.Challenge.removeCartItem("+id+")'>X</span>";
          html += "</div>";
        html += "</li>";

        $('#cart-list ul').append(html);
      }
    },
    removeCartItem: function(id){
      axios.get("/cart/remove/" + id).then(function(res) {
       App.Challenge.buildCartItemMrkp(res);
       App.Challenge.getCartList();
       App.Challenge.updateLockIcon();
     });
    }
};

App.Challenge.setup();
