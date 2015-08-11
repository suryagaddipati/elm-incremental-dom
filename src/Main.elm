import Graphics.Element exposing (Element,show)
import Text exposing (fromString)
import VirtualDom
import Time
-- import Native.VirtualDom
import  Graphics.Element exposing (..)

main = 
  Signal.map xtime (Time.every 200) 

xtime x =
      VirtualDom.text(toString(x))
