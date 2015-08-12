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
-- EVENTS

{-| Create a custom event listener.
    import Json.Decode as Json
    onClick : Signal.Address a -> Property
    onClick address =
        on "click" Json.value (\_ -> Signal.message address ())
You first specify the name of the event in the same format as with
JavaScript’s `addEventListener`. Next you give a JSON decoder, which lets
you pull information out of the event object. If that decoder is successful,
the resulting value is given to a function that creates a `Signal.Message`.
So in our example, we will send `()` to the given `address`.
-}
on : String -> Json.Decoder a -> (a -> Signal.Message) -> Property
on eventName decoder toMessage =
    Native.VirtualDom.on eventName defaultOptions decoder toMessage


{-| Same as `on` but you can set a few options.
-}
onWithOptions : String -> Options -> Json.Decoder a -> (a -> Signal.Message) -> Property
onWithOptions =
    Native.VirtualDom.on


{-| Options for an event listener. If `stopPropagation` is true, it means the
event stops traveling through the DOM so it will not trigger any other event
listeners. If `preventDefault` is true, any built-in browser behavior related
to the event is prevented. For example, this is used with touch events when you
want to treat them as gestures of your own, not as scrolls.
-}
type alias Options =
    { stopPropagation : Bool
    , preventDefault : Bool
    }


{-| Everything is `False` by default.
    defaultOptions =
        { stopPropagation = False
        , preventDefault = False
        }
-}
defaultOptions : Options
defaultOptions =
    { stopPropagation = False
    , preventDefault = False
    }
