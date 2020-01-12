var inventory = {
    "item1" : { 
        "itemName": "Joola Carbon Blade",
        "itemQuantity": 4 ,
        "imageSrc" : "C:/Users/Abhinav/Desktop/XT Stuff/POCs/POC 5 - Add to Cart/old way/Images/joolaCarbon.png",
        "cartQuantity" : 0
    },
    "item2" : { 
        "itemName": "Mark V Red Rubber",
        "itemQuantity": 4 ,
        "imageSrc" : "C:/Users/Abhinav/Desktop/XT Stuff/POCs/POC 5 - Add to Cart/old way/Images/markVRed.jpg",
        "cartQuantity" : 0
    },
    "item3" : { 
        "itemName": "Mark V Black Rubber", 
        "itemQuantity": 4 ,
        "imageSrc" : "C:/Users/Abhinav/Desktop/XT Stuff/POCs/POC 5 - Add to Cart/old way/Images/markVblack.png",
        "cartQuantity" : 0
    },
    "item4" : { 
        "itemName": "DHS 3 star Ball", 
        "itemQuantity": 4 ,
        "imageSrc" : "C:/Users/Abhinav/Desktop/XT Stuff/POCs/POC 5 - Add to Cart/old way/Images/stigaBall.jpg",
        "cartQuantity" : 0
    },
    "item5" : { 
        "itemName": "Stiga TT Table",
        "itemQuantity": 4 ,
        "imageSrc" : "C:/Users/Abhinav/Desktop/XT Stuff/POCs/POC 5 - Add to Cart/old way/Images/stigaTable.jpg",
        "cartQuantity" : 0
    } 
};
$.cartOperations = (function () {
    return {
        makeListing: function (jQuery){
            $('<h1>Table Tennis Merchandises !!!</h1>').appendTo(".heading");
            $.each(inventory, function(key, data) {
                $('<div class="item" id = "' +key+ '"></div> ').appendTo(".itemList");
                newKey = "#" + key;
                $('<img class= "itemImage" src = "' + data.imageSrc +'"></img>').appendTo(newKey);
                $(newKey).append('<h3 class= "itemNameHeader">'+inventory[key].itemName +'</h3>');
                $(newKey).append('<div class="listItemInfo" ></div>');
                $('<label>QTY : </label>').appendTo(newKey +" .listItemInfo");
                $('<span class="itemQty">'+ data.itemQuantity+'</span>').appendTo(newKey +" .listItemInfo");
                $('<button class="buttons">ADD</button>').appendTo(newKey +" .listItemInfo");
            })
            $.cartOperations.cartInit();
            // $(".buttons").on("click",$.cartOperations.addToCart);
        },
        cartInit: function (){
           var buttons =  $(".buttons");
           
           buttons.on("click",$.cartOperations.addToCart);
           
            $(".emptyCartButton").attr("disabled","disabled");
            $(".emptyCartButton").on("click",$.cartOperations.emptyCart);   
        },
        addToCart: function(){
            $(".emptyCartButton").removeAttr("disabled");
            var id = $(this).closest(".item")[0].id;
            var cartItemId = "cart-"+id;
            console.log("cart : ",$('#cartInfoWrapper #'+cartItemId).length);
            inventory[id].itemQuantity --;
            inventory[id].cartQuantity ++;
            if($('#cartInfoWrapper #'+cartItemId).length == 0){
                $('<div class ="cartItemsInfo" id ="'+cartItemId+'"></div>').appendTo("#cartInfoWrapper");
                $('<div class ="cartInfo"></div>').appendTo("#"+cartItemId);
                $('<label>'+inventory[id].itemName+'</label>').appendTo("#"+cartItemId+" .cartInfo");
                $('<span class ="qty">'+inventory[id].cartQuantity+'</span>').appendTo("#"+cartItemId+" .cartInfo");
                $('<button class="removeButtons">Remove</button>').appendTo("#"+cartItemId);
                $("#"+ cartItemId +",> .removeButtons").on("click",$.cartOperations.removeItem);   
            }
            else{
               if(inventory[id].itemQuantity <= 0){
                    $(this).attr("disabled","disabled");
                }
                else{
                    $(this).removeAttr("disabled");
                }
                $("#"+cartItemId +(" span")).text(inventory[id].cartQuantity);
            }
            $("#"+id+" .itemQty").text(inventory[id].itemQuantity);
        },
        removeItem: function(){
            var addedItemId = "#" + $(this).closest("div[class = cartItemsInfo]")[0].id;
            var listItemId = $(this).closest("div[class = cartItemsInfo]")[0].id.split("-")[1];
            $("#"+ listItemId +" .buttons").removeAttr("disabled");
            inventory[listItemId].itemQuantity ++;
            inventory[listItemId].cartQuantity --;
            if(inventory[listItemId].cartQuantity === 0){
                $(addedItemId).remove();
            }
            $(addedItemId+" span").text(inventory[listItemId].cartQuantity);
            $("#"+listItemId +" .itemQty").text(inventory[listItemId].itemQuantity);
            console.log("$(length : ",$("#cartInfoWrapper").children().length);
            if($("#cartInfoWrapper").children().length == 0){
                $(".emptyCartButton").attr("disabled","disabled");
            }
        },
        emptyCart: function(){
            $("#cartInfoWrapper").children().remove();
            $(".emptyCartButton").attr("disabled","disabled");
            $.each(inventory, function(key, data) {
                inventory[key].itemQuantity += inventory[key].cartQuantity; 
                newKey = "#" + key;
                console.log("after :", $(newKey+" .itemQty"));
                $(newKey+" .itemQty").text(inventory[key].itemQuantity);
                inventory[key].cartQuantity = 0;
                console.log ("rop('disabled",$(newKey+" .itemQty").prop('disabled', true ));
                if( $(newKey+" .buttons").prop('disabled', true ) ){
                    $(newKey+" .buttons").removeAttr("disabled");
                }
            })
        }
    }
})();
$.cartOperations.makeListing();
