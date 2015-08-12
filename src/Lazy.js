function lazyRef(fn, a)
{
  function thunk()
  {
    return fn(a);
  }
  return new Thunk(fn, [a], thunk);
}

function lazyRef2(fn, a, b)
{
  function thunk()
  {
    return A2(fn, a, b);
  }
  return new Thunk(fn, [a,b], thunk);
}

function lazyRef3(fn, a, b, c)
{
  function thunk()
  {
    return A3(fn, a, b, c);
  }
  return new Thunk(fn, [a,b,c], thunk);
}

function Thunk(fn, args, thunk)
{
  this.fn = fn;
  this.args = args;
  this.vnode = null;
  this.key = undefined;
  this.thunk = thunk;
}

Thunk.prototype.type = "Thunk";
Thunk.prototype.update = updateThunk;
Thunk.prototype.render = renderThunk;

function shouldUpdate(current, previous)
{
  if (current.fn !== previous.fn)
    {
      return true;
    }

    // if it's the same function, we know the number of args must match
    var cargs = current.args;
    var pargs = previous.args;

    for (var i = cargs.length; i--; )
    {
      if (cargs[i] !== pargs[i])
        {
          return true;
        }
    }

    return false;
}

function updateThunk(previous, domNode)
{
  if (!shouldUpdate(this, previous))
    {
      this.vnode = previous.vnode;
      return;
    }

    if (!this.vnode)
      {
        this.vnode = this.thunk();
      }

      var patches = diff(previous.vnode, this.vnode);
      patch(domNode, patches);
}

function renderThunk()
{
  debugger
  return this.thunk();
}
export default {
  lazyRef, lazyRef2, lazyRef3
}
