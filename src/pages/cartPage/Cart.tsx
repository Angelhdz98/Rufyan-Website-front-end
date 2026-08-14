import { useEffect, useState } from "react";
import InfoChart from "../../components/InfoChart";
import { CartItemDTORecord, PaintingItemDetails, ProductTypeEnum, ShoppingCartDTO } from "../../types/typesIndex";
import CartItem from "./CartItem";
import { addCartItemRequest, getCartItems, removeCartItemRequest } from "../../components/CartAndBuyRequests";




function Cart() {


  const [shoppingCart, setShoppingCart] = useState<ShoppingCartDTO>();


  const addCartItem = (cartItem: CartItemDTORecord) => {

    if (cartItem.productType == ProductTypeEnum.PAINTING) {
      const paintingItemDetails = cartItem.details as PaintingItemDetails;
      if (paintingItemDetails.isOriginalSelected) {
        alert("No existen 2 obras originales")
        return;
      }
      const newCartItemDTORecord: PaintingItemDetails = {
        isOriginalSelected: paintingItemDetails.isOriginalSelected,
        itemQuantity: paintingItemDetails.itemQuantity + 1,
        productType: ProductTypeEnum.PAINTING
      }
      addCartItemRequest(cartItem.productId, newCartItemDTORecord)
        .then((response) => {
          setShoppingCart(response);
        })
        .catch((error) => {
          alert("Hubo un error: " + error);
        });
    }

    addCartItemRequest(cartItem.productId, cartItem.details)
      .then((response) => {
        setShoppingCart(response);
      })
      .catch((error) => {
        alert("Hubo un error: " + error);
      });








  }

  const removeCartItem = (cartItemId: number) => {
    removeCartItemRequest(cartItemId)
      .then((response) => {
        setShoppingCart(response);

      })
      .catch((error) => {
        alert("Hubo un error: " + error);
      });
  }

  useEffect(() => {

    getCartItems()
      .then((reponse) => {
        setShoppingCart(reponse);
      })
      .catch((error) => {
        alert("Hubo un error solicitando el carrito: " + error);

      });

  }, []);




  const renderedCartItems = shoppingCart?.cartItemDTOSet.map((cart) => {
    return <CartItem key={cart.productName}
      cartItem={cart} addCartItem={addCartItem} removeCartItem={removeCartItem}
    />
  });



  return (<div className="m-6  shadow-lg rounded-lg h-fit">
    {/* Contenedor de las columnas */}
    <div className="my-2 flex flex-col md:flex-row ]  gap-8 place-content-center  h-fit">
      {/* Columna izquierda (ocupará el espacio restante y permitirá scroll) */}
      <div className="flex flex-col   w-full  sm:w-full  md:w-3/4 lg:3/5 md:overflow-y-scroll">
        {/* Contenedor de los elementos hijos (CartItem) */}
        <div className="flex flex-col gap-4 p-4 w-full">
          {
            renderedCartItems
          }
        </div>

        {/* Sección de subtotal y botón */}

      </div>

      {/* Columna derecha (altura fija de 420px) */}
      <div className=" md:w-1/3 h-fit border border-black rounded-lg">
        <InfoChart totalPrice={shoppingCart?.subTotalAmount.toString() || "algo salió mal"} />
      </div>
    </div>
  </div>
  );
}

export default Cart;