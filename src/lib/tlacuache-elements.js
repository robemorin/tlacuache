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
    Slabelx += `<line x1="${minSpace}" y1="${alto+minSpace-Dpx*k}" x2="${ancho+minSpace}" y2="${alto+minSpace-Dpx*k}" stroke="gray" stroke-width="2.5" />`
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