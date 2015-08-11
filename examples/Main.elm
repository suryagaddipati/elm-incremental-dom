module Main where
import Html exposing (..)
import Time

main = 

  Signal.map xtime (Time.every 200) 

xtime x =
       node "h1" [] [text "Meow", text "meow2", text (toString x)]
