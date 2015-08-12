module VirtualDom where 
import Native.VirtualDom 
import Graphics.Element exposing (Element)
import Json.Decode as Json

type Node = Node

type Property = Property

text : String -> Node
text =
  Native.VirtualDom.text

node : String -> List Property -> List Node -> Node
node =
  Native.VirtualDom.node

property : String -> Json.Value -> Property
property =
    Native.VirtualDom.attribute


attribute : String -> String -> Property
attribute =
      Native.VirtualDom.attribute

{-| A performance optimization that delays the building of virtual DOM nodes.
Calling `(view model)` will definitely build some virtual DOM, perhaps a lot of
it. Calling `(lazy view model)` delays the call until later. During diffing, we
can check to see if `model` is referentially equal to the previous value used,
and if so, we just stop. No need to build up the tree structure and diff it,
we know if the input to `view` is the same, the output must be the same!
-}
lazy : (a -> Node) -> a -> Node
lazy =
    Native.VirtualDom.lazy


{-| Same as `lazy` but checks on two arguments.
-}
lazy2 : (a -> b -> Node) -> a -> b -> Node
lazy2 =
    Native.VirtualDom.lazy2


{-| Same as `lazy` but checks on three arguments.
-}
lazy3 : (a -> b -> c -> Node) -> a -> b -> c -> Node
lazy3 =
    Native.VirtualDom.lazy3
