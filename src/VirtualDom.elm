module VirtualDom where 
import Native.VirtualDom 

type Node = Node

text : String -> Node
text =
      Native.VirtualDom.text
