module Main where
import IncrementalHtml exposing (..)
import Time

main = 

  Signal.map xtime (Time.every 200) 

xtime x =
      node "h1" [] [ text(toString(x))]
