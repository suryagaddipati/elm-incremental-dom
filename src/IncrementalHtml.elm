module IncrementalHtml where 
import Graphics.Element exposing (Element)
import VirtualDom
type alias Html = VirtualDom.Node

text : String -> Html
text =
      VirtualDom.text

node : String -> List String -> List Html -> Html
node =
      VirtualDom.node

