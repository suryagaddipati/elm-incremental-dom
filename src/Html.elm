module Html where 
import Graphics.Element exposing (Element)
import VirtualDom exposing (Property)
type alias Html = VirtualDom.Node

type alias Attribute = VirtualDom.Property

text : String -> Html
text =
      VirtualDom.text

node : String -> List Property -> List Html -> Html
node =
      VirtualDom.node

attribute : String -> String -> Property
attribute =
      VirtualDom.attribute

      
section : List Property -> List Html -> Html
section =
    node "section"

