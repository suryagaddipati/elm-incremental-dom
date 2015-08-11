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

attribute : String -> String -> Property
attribute =
      Native.VirtualDom.attribute
