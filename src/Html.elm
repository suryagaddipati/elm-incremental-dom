module Html where 
import Graphics.Element exposing (Element)
import VirtualDom exposing (Property)
type alias Html = VirtualDom.Node

text : String -> Html
text =
      VirtualDom.text

node : String -> List Property -> List Html -> Html
node =
      VirtualDom.node

attribute : String -> String -> Property
attribute =
      VirtualDom.attribute

