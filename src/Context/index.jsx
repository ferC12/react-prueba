import { createContext, useState, useEffect } from "react";

export const ShoppingCartContext = createContext()

export const ShoppingCartProvider = ({children}) => {
  const [count, setCount] = useState(0)

  //Product detail - open/close
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)
  const openProductDetail = () =>  setIsProductDetailOpen(true)
  const closeProductDetail = () =>  setIsProductDetailOpen(false)

  //Checkout side menu - open/close
  const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false)
  const openCheckoutSideMenu = () =>  setIsCheckoutSideMenuOpen(true)
  const closeCheckoutSideMenu = () =>  setIsCheckoutSideMenuOpen(false)

  //Product detail - show productos
  const [productToShow, setProductToShow] = useState({})

  //Shopping cart - Add products to cart
  const [cartProducts, setCartProducts] = useState([])

  //Shopping Cart - order
  const [order, setOrder] = useState([])

  //Get products
  const [items, setItems] = useState(null)
  const [filteredItems, setFilteredItems] = useState(null)

  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/products')
     .then(response => response.json())
     .then(data => setItems(data))
  }, [])

  //-------------Get products by title
  const [searchByTitle, setSearchByTitle] = useState(null)

  const filteredItemsByTitle = (items, searchByTitle) => {
    return items?.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
  }

  //-------------Get products by category
  const [searchByCategory ,setSearchByCategory] = useState(null)

  const filteredItemsByCategory = (items, searchByCategory) => {
    return items?.filter(item => item.category.name.toLowerCase().includes(searchByCategory.toLowerCase()))
  }

  //------------Search products by title and category---------------
  const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
    if (searchType === 'BY_TITLE') {
      return filteredItemsByTitle(items, searchByTitle)
    }

    if (searchType === 'BY_CATEGORY') {
      return filteredItemsByCategory(items, searchByCategory)
    }

    if (searchType === 'BY_TITLE_AND_CATEGORY') {
      return filteredItemsByCategory(items, searchByCategory).filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
    }

    if (!searchType) {
      return items
    }
  }
  
  useEffect(() => {
    if (searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_TITLE_AND_CATEGORY', items, searchByTitle, searchByCategory))
    if (searchByTitle && !searchByCategory) setFilteredItems(filterBy('BY_TITLE', items, searchByTitle, searchByCategory))
    if (!searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_CATEGORY', items, searchByTitle, searchByCategory))
    if (!searchByTitle && !searchByCategory) setFilteredItems(filterBy(null, items, searchByTitle, searchByCategory))
  }, [items, searchByTitle, searchByCategory])

  return (
      <ShoppingCartContext.Provider value={{
        count,
        setCount,
        openProductDetail,
        closeProductDetail,
        isProductDetailOpen,
        productToShow,
        setProductToShow,
        cartProducts,
        setCartProducts,
        isCheckoutSideMenuOpen,
        openCheckoutSideMenu,
        closeCheckoutSideMenu,
        order,
        setOrder,
        items,
        setItems,
        searchByTitle,
        setSearchByTitle,
        filteredItems,
        searchByCategory,
        setSearchByCategory,
      }}>
        {children}  
      </ShoppingCartContext.Provider>
      
  )
}