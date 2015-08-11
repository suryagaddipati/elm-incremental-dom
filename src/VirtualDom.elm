module VirtualDom where 
import Native.VirtualDom 
import Graphics.Element exposing (Element)
import Json.Decode as Json

type Node = Node

text : String -> Node
text =
  Native.VirtualDom.text

node : String -> List String -> List Node -> Node
node =
  Native.VirtualDom.node
