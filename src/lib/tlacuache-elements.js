class cuartil extends HTMLElement {
    constructor() {
      super();
      // element created
      this.Q 
      this.lim 
      this.dim 
      this.xlabel
    }
    connectedCallback() {
      if(this.Q==null){
        this.innerHTML=`<div><fieldset>
  <legend>tlacuache-cuartil:</legend>
  Sintaxis:<br><br>
  &lt;tlacuache-cuartil  q="<i>Cuartiles</i>" lim="<i>x_min,x_max,step</i>" dim="<i>height,width</i>" xlabel='<i>x label</i>' /&gt; <br><br>
  Ejemplo:<br><br>
  &lt;tlacuache-cuartil  q="" lim="-6,10,2" dim="280,400" xlabel='eje x' /&gt; <br>
  &lt;tlacuache-cuartil  q="[-6,-4,0,6,8]" lim="-6,10,2" dim="280,400" xlabel='eje x' /&gt; <br>
  &lt;tlacuache-cuartil  q="[-1,2,5,6,8],[-2,0,4,6,7],[-6,-4,0,6,8]" lim="-6,10,2" dim="280,400" xlabel='eje x' /&gt;<br>
  
</fieldset></div>`
return
      }
   const xmin=this.lim[0], xmax=this.lim[1], Dx=this.lim[2], minSpace=this.dim[1]*.05, Q=this.Q
   const ancho=this.dim[1]-2*minSpace, alto = 0.8*this.dim[0]-minSpace, xtick=[Math.ceil(xmin/Dx)*Dx]
   const L=[ancho/(xmax-xmin)]
   L.push( minSpace-L[0]*xmin )
   const Dpx = L[0]*Dx
   while(xtick[xtick.length-1]<=xmax){
        xtick.push(xtick[xtick.length-1]+Dx)    
   }
   let Slabelx = "", temporalx=0
   for(let k=1;(alto+minSpace-Dpx*k)>=minSpace;++k){
    Slabelx += `<line x1="${minSpace}" y1="${alto+minSpace-Dpx*k}" x2="${ancho+minSpace}" y2="${alto+minSpace-Dpx*k}" stroke="gray" stroke-width="1.5" />`
    temporalx=alto+minSpace-Dpx*k
   }
   for(let k=0;k<xtick.length-1;++k){
    Slabelx += `<line x1="${L[0]*xtick[k]+L[1]}" y1="${alto+minSpace}" x2="${L[0]*xtick[k]+L[1]}" y2="${temporalx}" stroke="gray" stroke-width="1.5" />
                <line x1="${L[0]*xtick[k]+L[1]}" y1="${alto+0.5*minSpace}" x2="${L[0]*xtick[k]+L[1]}" y2="${alto+1.5*minSpace}" stroke="black" stroke-width="3" />
                <text font-size="${0.075*alto}" text-anchor="middle" alignment-baseline="hanging"  x="${L[0]*xtick[k]+L[1]}" y="${alto+1.5*minSpace+3}" >${xtick[k]}</text>`
   }
   let whiskers=``
   if(Q.length!=0){
    let Sw = (alto+minSpace-temporalx)*2/(1+Math.sqrt(5))
    let Se = (alto+minSpace-temporalx)-Sw
  
    const n = Q.length

    Sw /= n
    Se /= (n+1)

    for(let k=0;k<n;++k){
      let q= Q[k]
      whiskers += `<line x1="${L[0]*q[0]+L[1]}" x2="${L[0]*q[0]+L[1]}" y1="${alto+minSpace-(k+1)*(Se+Sw)+Sw}"  y2="${alto+minSpace-(k+1)*(Se+Sw)}" stroke="black" stroke-width="3" />
                   <rect x="${L[0]*q[1]+L[1]}" height="${Sw}" y="${alto+minSpace-(k+1)*(Se+Sw)}"  width="${L[0]*(q[3]-q[1])}" fill="none" stroke="black" stroke-width="3" />
                   <line x1="${L[0]*q[0]+L[1]}" x2="${L[0]*q[1]+L[1]}" y1="${alto+minSpace-(k+1)*(Se+Sw)+0.5*Sw}"  y2="${alto+minSpace-(k+1)*(Se+Sw)+0.5*Sw}" stroke="black" stroke-width="3" />
                   <line x1="${L[0]*q[2]+L[1]}" x2="${L[0]*q[2]+L[1]}" y1="${alto+minSpace-(k+1)*(Se+Sw)+Sw}"  y2="${alto+minSpace-(k+1)*(Se+Sw)}" stroke="black" stroke-width="5" />
                   <line x1="${L[0]*q[3]+L[1]}" x2="${L[0]*q[4]+L[1]}" y1="${alto+minSpace-(k+1)*(Se+Sw)+0.5*Sw}"  y2="${alto+minSpace-(k+1)*(Se+Sw)+0.5*Sw}" stroke="black" stroke-width="3" />
                   <line x1="${L[0]*q[4]+L[1]}" x2="${L[0]*q[4]+L[1]}" y1="${alto+minSpace-(k+1)*(Se+Sw)+Sw}"  y2="${alto+minSpace-(k+1)*(Se+Sw)}" stroke="black" stroke-width="3" /> `
    }
    
   }

   this.innerHTML = `<svg width="${this.dim[1]}" height="${this.dim[0]}" >${Slabelx}
              <line x1="${minSpace}" y1="${alto+minSpace}" x2="${ancho+minSpace}" y2="${alto+minSpace}" stroke="black" stroke-width="3" />
              ${whiskers}
              <text font-size="${0.09*alto}" text-anchor="middle" alignment-baseline="text-top"  x="${0.5*this.dim[1]}" y="${this.dim[0]-0.2*minSpace}" >${this.xlabel}</text>
            </svg>`
    }
  
    disconnectedCallback() {
      // browser calls this method when the element is removed from the document
      // (can be called many times if an element is repeatedly added/removed)
    }
  
    static get observedAttributes() {
      return ['q','lim','dim','xlabel'];
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      // called when one of attributes listed above is modified
      switch(name){
        case 'q':
            this.Q = eval(`[${newValue}]`)
            break
        case 'lim':
            this.lim = eval(`[${newValue}]`)
            break
        case 'dim':
            this.dim = eval(`[${newValue}]`)
            break
        case 'xlabel':
            this.xlabel = newValue
            break
      }
    }
  }
window.customElements.define('tlacuache-cuartil',cuartil)
class distNormal extends HTMLElement
  {
    constructor() {
      super();
      // element created
      this.mean = null
      this.s = 1
      this.xmax = null
      this.xmin = null
      this.grid
      this.xlabel=null
      this.show_s
      this.xtick=[]
      this.dim=[180,400]
      this.type=null

    }
    connectedCallback() {
      if(this.mean==null){
        this.innerHTML=`<div><fieldset>
          <legend>tlacuache-distribucion normal:</legend>
          Sintaxis:<br><br>
          Ejemplo
          
        </fieldset></div>`
        return
      }
      const dim=this.dim
      const minSpace={x:this.dim[1]*.05,y:this.dim[0]*.05}
      const ancho = dim[1]-2*minSpace.x, alto = (dim[0]-5*minSpace.y)
      let areadetrabajo=`<rect x="${minSpace.x}" y="${minSpace.y}" height="${alto}" width="${ancho}" fill="none" stroke="gray" stroke-width="1" />`
      
      let curva =``
      let xv = tlacu.linspace(-2.5,2.5)
      let yv = tlacu.evaluar('-Math.exp(-0.5*x**2)',xv)
      const L = {x:[ancho/5,minSpace.x+ancho/2],y:[alto,minSpace.y+alto]}
      for(let k=0;k<xv.length;++k){
        curva += `${L.x[0]*xv[k]+L.x[1]},${L.y[0]*yv[k]+L.y[1]} `
      }
      let stuffAfter=``, stuffBefore=``

      if(this.xtick.length>0){
        for(let k=0;k<this.xtick.length;++k) stuffAfter += `<line x1="${L.x[0]*((this.xtick[k]-this.mean)/this.s)+L.x[1]}" x2="${L.x[0]*((this.xtick[k]-this.mean)/this.s)+L.x[1]}" y1="${L.y[1]-0.01*ancho}" y2="${L.y[1]+0.01*ancho}"  style="stroke:black;stroke-width:2"/> <text font-size="${0.1*alto}" text-anchor="middle" alignment-baseline="hanging"  x="${L.x[0]*((this.xtick[k]-this.mean)/this.s)+L.x[1]}" y="${L.y[1]+0.02*ancho}" >${this.xtick[k]}</text>`
      }
      if(this.xlabel!=null){
        stuffAfter+=`<text font-size="${0.1*alto}" text-anchor="middle" alignment-baseline="start"  x="${L.x[1]}" y="${this.dim[0]-0.5*minSpace.y}" >${this.xlabel}</text>`
      }

      if(!(this.xmax == null && this.xmin == null)){
        this.xmax = this.xmax == null ? this.mean+2.5*this.s:this.xmax
        this.xmin = this.xmin == null ? this.mean-2.5*this.s:this.xmin
        console.log(`[ ${this.xmin} , ${this.xmax}]`)

        xv = tlacu.linspace((this.xmin-this.mean)/this.s,(this.xmax-this.mean)/this.s)
        yv = tlacu.evaluar('-Math.exp(-0.5*x**2)',xv)
        let coor = `${L.x[0]*(this.xmin-this.mean)/this.s+L.x[1]},${L.y[1]} `
        for(let k=0;k<xv.length;++k){
          coor += `${L.x[0]*xv[k]+L.x[1]},${L.y[0]*yv[k]+L.y[1]} `
        }
        coor += `${L.x[0]*(this.xmax-this.mean)/this.s+L.x[1]},${L.y[1]} `
        stuffBefore +=`<polyline points="${coor}"  style="fill:RGB(200,200,200);stroke:gray;stroke-width:2" />`
      }

      

      
      this.innerHTML = `<svg width="${dim[1]}" height="${dim[0]}" >
      ${stuffBefore}
        <polyline points="${curva}"  style="fill:none;stroke:black;stroke-width:2" />
        <line x1="${minSpace.x}" x2="${minSpace.x+ancho}" y1="${minSpace.y+alto}" y2="${minSpace.y+alto}" stroke="black" stroke-width="2.5"/>
        ${stuffAfter}
        </svg>`
    }
  
    static get observedAttributes() {
      return ['mean','s','xmax','xmin','dim','xlabel', 'show_s','xtick','type'];
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      // called when one of attributes listed above is modified
      switch(name){
        case 'mean':
            this.mean = eval(`${newValue}`)
            break
        case 's':
            this.s = eval(`${newValue}`)
            break
        case 'xmax':
            this.xmax = eval(`${newValue}`)
            break
        case 'xmin':
            this.xmin = eval(`${newValue}`)
            break
        case 'xtick':
            this.xtick = eval(`[${newValue}]`)
            break
        case 'dim':
            this.dim = eval(`[${newValue}]`)
            break
        case 'xlabel':
            this.xlabel = newValue
            break
        case 'show_s':
            this.show_s = newValue
            break
        case 'type':
            this.type = newValue
            break
      }
    }
  }
window.customElements.define('tlacuache-dist-normal',distNormal)
//
class Milimetrado extends HTMLElement
  {
    constructor() {
      super();
      // element created
      this.size = null
      this.cuadricula = [10,20]
      this.n = 5
      this.color = 'RGB(64, 64, 64)'
      this.stroke = .7
      this.stroke2 = .2

    }
    connectedCallback() {
      if(this.size==null){
        this.innerHTML=`<div><fieldset>
        
          <legend>tlacuache-milimetrado:</legend>
          <b>Sintaxis:</b><br><br>
          <table>
          <tr><td>size:</td></tr>
          <tr><td></td><td>pixeles en y, pixeles en x</td></tr>
          <tr><td>cuadricula:<br>
          <tr><td></td><td>cuadros primarios en <i>x</i> y <i>y</i></td></tr>
          <tr><td>n:<br>
          <tr><td></td><td>número de subdivisiones secundarias</td></tr>
          <tr><td>stroke:<br>
          <tr><td></td><td>grosor línea principal</td></tr>
          <tr><td>stroke2:<br>
          <tr><td></td><td>grosor línea secundaria</td></tr>
          <tr><td>color:<br>
          <tr><td></td><td>color mallado</td></tr>
          </table>
          <br>
          

          <b>Ejemplos:</b><br/><br/>
          &lt;tlacuache-milimetrado dim="400,800" /&gt;<br/>
          &lt;tlacuache-milimetrado size="300,720" cuadricula="5,12"  n="2" color = 'RGB(200, 64, 64)'
  stroke = ".7" stroke2 = ".2"//&gt;
          
        </fieldset></div>`
        return
      }
      console.log(this.cuadricula)
      let step = Math.min(this.size[0]/this.cuadricula[0],this.size[1]/this.cuadricula[1])
      let c = ''
      for (let k=0;k<=this.cuadricula[0];++k) c += `<line style="stroke-width:${this.stroke};stroke:${this.color}" x1="0" x2="${step*this.cuadricula[1]}" y1="${step*k}" y2="${step*k}"/>`
      for (let k=0;k<=this.cuadricula[1];++k) c += `<line style="stroke-width:${this.stroke};stroke:${this.color}" y1="0" y2="${step*this.cuadricula[0]}" x1="${step*k}" x2="${step*k}"/>`
      step /= this.n
      for (let k=0;k<=this.n*this.cuadricula[0];++k) c += `<line style="stroke-width:${this.stroke2};stroke:${this.color}" x1="0" x2="${this.n*step*this.cuadricula[1]}" y1="${step*k}" y2="${step*k}"/>`
      for (let k=0;k<=this.n*this.cuadricula[1];++k) c += `<line style="stroke-width:${this.stroke2};stroke:${this.color}" y1="0" y2="${this.n*step*this.cuadricula[0]}" x1="${step*k}" x2="${step*k}"/>`
      
      this.innerHTML=`<svg height="${this.size[0]+2*this.stroke}" width="${this.size[1]+2*this.stroke}">
      <g transform="scale(1, 1) translate(${this.stroke},${this.stroke})">${c}</g>
      </svg>`
    }
  
    static get observedAttributes() {
      return ['size','cuadricula','n','color'];
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      // called when one of attributes listed above is modified
      switch(name){
        case 'size':
            this.size = eval(`[${newValue}]`)
            break
        case 'cuadricula':
            this.cuadricula = eval(`[${newValue}]`)
            break
        case 'n':
            this.n = eval(`${newValue}`)
            break
        case 'stroke':
            this.stroke = eval(`${newValue}`)
            break
        case 'color':
            this.color = newValue
            break
      }
    }
  }
window.customElements.define('tlacuache-milimetrado',Milimetrado)