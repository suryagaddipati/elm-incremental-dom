module Main where
import IncrementalHtml exposing (..)
import Time

main = 

  Signal.map xtime (Time.every 200) 

xtime x =
       text(toString(x))
