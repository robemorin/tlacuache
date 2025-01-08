/* Actualización 13-12-2024 */
class tlacuache_cuartil extends HTMLElement {
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
window.customElements.define('tlacuache-cuartil',tlacuache_cuartil)
class tlacuache_distNormal extends HTMLElement
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
        //console.log(`[ ${this.xmin} , ${this.xmax}]`)

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
window.customElements.define('tlacuache-dist-normal',tlacuache_distNormal)
//
class tlacuache_Milimetrado extends HTMLElement
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
      this.bcolor= 'GhostWhite';

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
          &lt;tlacuache-milimetrado size="400,800" /&gt;<br/>
          &lt;tlacuache-milimetrado size="300,720" cuadricula="5,12"  n="2" color = 'RGB(200, 64, 64)'
  stroke = ".7" stroke2 = ".2"/&gt;
          
        </fieldset></div>`
        return
      }
      let step = Math.min(this.size[0]/this.cuadricula[0],this.size[1]/this.cuadricula[1])
      let c = ''
      for (let k=0;k<=this.cuadricula[0];++k) c += `<line style="stroke-width:${this.stroke};stroke:${this.color}" x1="0" x2="${step*this.cuadricula[1]}" y1="${step*k}" y2="${step*k}"/>`
      for (let k=0;k<=this.cuadricula[1];++k) c += `<line style="stroke-width:${this.stroke};stroke:${this.color}" y1="0" y2="${step*this.cuadricula[0]}" x1="${step*k}" x2="${step*k}"/>`
      step /= this.n
      for (let k=0;k<=this.n*this.cuadricula[0];++k) c += `<line style="stroke-width:${this.stroke2};stroke:${this.color}" x1="0" x2="${this.n*step*this.cuadricula[1]}" y1="${step*k}" y2="${step*k}"/>`
      for (let k=0;k<=this.n*this.cuadricula[1];++k) c += `<line style="stroke-width:${this.stroke2};stroke:${this.color}" y1="0" y2="${this.n*step*this.cuadricula[0]}" x1="${step*k}" x2="${step*k}"/>`
      
      this.innerHTML=`<svg height="${this.size[0]+2*this.stroke}" width="${this.size[1]+2*this.stroke}" style="background-color:${this.bcolor}">
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
window.customElements.define('tlacuache-milimetrado',tlacuache_Milimetrado)
//
class tlacuache_ejes extends HTMLElement
  {
    constructor() {
      super();
      // element created
      this.size = null
      this.xlabel = null
      this.ylabel = null
      this.xlim=[-1,1]
      this.ylim=[-1,1]
      this.xtick=[]
      this.ytick=[]
      this.ddx=null
      this.ddy=null
      this.grid=true
      this.bcolor= 'GhostWhite';
      this.dpx=false
      this.dpy=false
      
    }
    connectedCallback() {
      if(this.size==null){
        console.log("Falta documentación")
        return
      }
      function coor2px(coor,px){
        const L=[(px[1]-px[0])/(coor[1]-coor[0])]
        L.push(px[0]-L[0]*coor[0])
        return L
      }

      this.setAttribute('xlim',this.xlim)
      this.setAttribute('ylim',this.ylim)


      let Safter=``, Sbefore=``
      console.log(`medida: ${this.size[0]} x ${this.size[1]}`)
      let dummy1=this.size[0]
      let dummy2=this.size[1]

      
      let minSpace=[0.1*dummy1,0.1*dummy2]
      const sizeFont=[Math.min(...minSpace)*.5,Math.min(...minSpace)*.5/1.6]
      let subSVGsize=[sizeFont[1],minSpace[1],(this.size[0]-2)-minSpace[0]-sizeFont[1],.9*this.size[1]-2]      
      let Origen=[0,0], labels=``

      //console.log(`x lim: ${this.xlim}`) posicion subsvg eje x
      if(this.xlim[0]>0){
        subSVGsize[1]=2*minSpace[1]
        subSVGsize[3]=(this.size[1]-2)-2*minSpace[1]
        Origen[0]=minSpace[1]+2
      }else if(this.xlim[1]<0){
        subSVGsize[3]=(this.size[1]-2)-2*minSpace[1]
        Origen[0]=this.size[1]-2
      }else{
        Origen[0]=coor2px(this.xlim,[0,subSVGsize[3]])[1]+minSpace[1]
      }

      //console.log(`y lim: ${this.ylim}`) posicion subsvg eje y
      if(this.ylim[0]>0){
        subSVGsize[2] = (this.size[0]-2)-2*minSpace[0]
        Origen[1]=this.size[0]-minSpace[0]-2
      }else if(this.ylim[1]<0){
        subSVGsize[0] = minSpace[0]
        subSVGsize[2]=(this.size[0]-2)-2*minSpace[0]
        Origen[1]=2
      }else{
        Origen[1]=coor2px(this.ylim,[subSVGsize[2],0])[1]+subSVGsize[0]
      }
      //Calculamos las conversiones
      const Lx=coor2px(this.xlim,[0,subSVGsize[3]]), Ly=coor2px(this.ylim,[subSVGsize[2],0])
      this.setAttribute('l_x',Lx)
      this.setAttribute('l_y',Ly)
      //Calculamos los ejes principales
      let ejexP, ejeyP
      if(this.xlim[0]>0){
        ejexP = `${minSpace[1]},${Origen[1]}
                 ${7*minSpace[1]/6},${Origen[1]} 
                 ${8*minSpace[1]/6},${Origen[1]-minSpace[1]/6}  
                 ${10*minSpace[1]/6},${Origen[1]+minSpace[1]/6}  
                 ${11*minSpace[1]/6},${Origen[1]}  
                 ${this.size[1]-2},${Origen[1]}`
      }else if(this.xlim[1]<0){
        ejexP = `${minSpace[1]},${Origen[1]}
                 ${this.size[1]-5*minSpace[1]/6},${Origen[1]} 
                 ${this.size[1]-4*minSpace[1]/6},${Origen[1]-minSpace[1]/6}  
                 ${this.size[1]-2*minSpace[1]/6},${Origen[1]+minSpace[1]/6}  
                 ${this.size[1]-minSpace[1]/6},${Origen[1]}  
                 ${this.size[1]-2},${Origen[1]}`
      }else{
        ejexP = `${minSpace[1]},${Origen[1]} ${this.size[1]-2},${Origen[1]}`
      }
      if(this.ylim[0]>0){
        ejeyP = `${Origen[0]},0
                  ${Origen[0]},${subSVGsize[2]+minSpace[0]/6}
                  ${Origen[0]+minSpace[0]/6},${subSVGsize[2]+2*minSpace[0]/6}
                  ${Origen[0]-minSpace[0]/6},${subSVGsize[2]+4*minSpace[0]/6}
                  ${Origen[0]},${subSVGsize[2]+5*minSpace[0]/6}
         ${Origen[0]},${Origen[1]}`
      }else if(this.ylim[1]<0){
        ejeyP = `${Origen[0]},0
                  ${Origen[0]},${minSpace[0]/6}
                  ${Origen[0]+minSpace[0]/6},${2*minSpace[0]/6}
                  ${Origen[0]-minSpace[0]/6},${4*minSpace[0]/6}
                  ${Origen[0]},${5*minSpace[0]/6}
         ${Origen[0]},${subSVGsize[2]+subSVGsize[0]}`
      }else{
        ejeyP = `${Origen[0]},0 ${Origen[0]},${subSVGsize[2]+subSVGsize[0]}`
      }
      //Calculamos las etiquetas y la malla
      //xtick
      for(let k=0;k<this.xtick.length;++k){
        if(this.grid){
          labels += `<line x1="${Lx[0]*this.xtick[k]+Lx[1]+subSVGsize[1]}" x2="${Lx[0]*this.xtick[k]+Lx[1]+subSVGsize[1]}" y1="0" y2="${this.size[0]-minSpace[0]}"   style="fill:none;stroke-width:.5;stroke:dimgray"/>`
        }
        labels +=(Math.abs(this.xtick[k])<1e-15)?'': `<text x="${Lx[0]*this.xtick[k]+Lx[1]+subSVGsize[1]}" y="${Origen[1]+0.15*minSpace[0]}" text-anchor="middle" alignment-baseline="hanging" font-size="${sizeFont[1]}">${(this.dpx==false)?this.xtick[k]:this.xtick[k].toPrecision(this.dpx)}</text>
        <line x1="${Lx[0]*this.xtick[k]+Lx[1]+subSVGsize[1]}" x2="${Lx[0]*this.xtick[k]+Lx[1]+subSVGsize[1]}" y1="${Origen[1]+0.15*minSpace[0]}" y2="${Origen[1]-0.15*minSpace[0]}"   style="fill:none;stroke-width:1.5;stroke:black"/>`
      } 
      //ytick
      for(let k=0;k<this.ytick.length;++k){
        if(this.grid){
          labels += `<line x1="${minSpace[1]}" x2="${this.size[1]}" y1="${Ly[0]*this.ytick[k]+Ly[1]+subSVGsize[0]}" y2="${Ly[0]*this.ytick[k]+Ly[1]+subSVGsize[0]}"   style="fill:none;stroke-width:.5;stroke:dimgray"/>`
        }
        labels +=(Math.abs(this.ytick[k])<1e-15)?'': `<text x="${Origen[0]-0.15*minSpace[1]}" y="${Ly[0]*this.ytick[k]+Ly[1]+subSVGsize[0]}" text-anchor="end" alignment-baseline="middle" font-size="${sizeFont[1]}">${(this.dpy==false)?this.ytick[k]:this.ytick[k].toPrecision(this.dpy)}</text>
        <line x1="${Origen[0]-0.15*minSpace[0]}" x2="${Origen[0]+0.15*minSpace[0]}" y1="${Ly[0]*this.ytick[k]+Ly[1]+subSVGsize[0]}" y2="${Ly[0]*this.ytick[k]+Ly[1]+subSVGsize[0]}"   style="fill:none;stroke-width:1.5;stroke:black"/>`
      }
      //---Inicio Malla secundaria
      if(this.ddx!=null){
        for(let k=0;k<this.ddx.length;++k){
            labels += `<line x1="${Lx[0]*this.ddx[k]+Lx[1]+subSVGsize[1]}" x2="${Lx[0]*this.ddx[k]+Lx[1]+subSVGsize[1]}" y1="0" y2="${this.size[0]-minSpace[0]}" style="fill:none;stroke-width:.2;stroke:dimgray"/>`
        } 
      }
      if(this.ddy!=null){
        for(let k=0;k<this.ddy.length;++k){
            labels += `<line x1="${minSpace[1]}" x2="${this.size[1]}" y1="${Ly[0]*this.ddy[k]+Ly[1]+subSVGsize[0]}" y2="${Ly[0]*this.ddy[k]+Ly[1]+subSVGsize[0]}"   style="fill:none;stroke-width:.2;stroke:dimgray"/>`
        } 
      }
      //---fin Malla secundaria
      //Inicio Temporal
      Safter +=`<!--rect x="0" y="0" height="${this.size[0]-minSpace[0]}" width="${minSpace[1]}" style="fill:none;stroke-width:3;stroke:yellow" /-->
                <!--rect y="${this.size[0]-minSpace[0]}" x="${minSpace[1]}" height="${minSpace[0]}" width="${this.size[1]-minSpace[1]}" style="fill:none;stroke-width:3;stroke:orange" /-->
                
                <!--rect y="${subSVGsize[0]}" x="${subSVGsize[1]}" height="${subSVGsize[2]}" width="${subSVGsize[3]}" style="fill:none;stroke-width:3;stroke:purple" /-->
                ${labels}
                <polyline points="${ejexP}" style="fill:none;stroke-width:1.5;stroke:black"/>
                <polyline points="${ejeyP}" style="fill:none;stroke-width:1.5;stroke:black"/>
                `
      //Fin temporal
      if(this.xlabel != null){
        Safter += `<text x="${this.size[1]/2+minSpace[1]}" y="${this.size[0]-sizeFont[0]*.3}" text-anchor="middle" font-size="${sizeFont[0]}">${this.xlabel}</text>
                  <svg y="${subSVGsize[0]}" x="${subSVGsize[1]}" height="${subSVGsize[2]}" width="${subSVGsize[3]}"></svg>`
      }
      if(this.ylabel != null){
        Safter += `<g transform="matrix(0 -1 1 0 0 ${this.size[0]/2-minSpace[0]})"><text x="0" y="0" text-anchor="middle" alignment-baseline="hanging" font-size="${sizeFont[0]}">${this.ylabel}</text></g>`
      }
      
      this.innerHTML += `<svg width="${this.size[1]*1.02}" height="${this.size[0]}" style="background-color: ${this.bcolor}" xmlns="http://www.w3.org/2000/svg">${Sbefore} ${Safter}</svg>`
    }
  
    static get observedAttributes() {
      return ['size','xlabel', 'ylabel','xlim', 'ylim','lineWidth','lineWidth2','color','dx','xtick','dy','ytick','dpx','dpy','ddx','ddy']
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      switch(name){
        case 'size':
            this.size = eval(`[${newValue}]`)
            console.log(`size:${this.size[0]}`)
            break
        case 'xlabel':
            this.xlabel = newValue
            break
        case 'ylabel':
            this.ylabel = newValue
            break
        case 'xlim':
            this.xlim = eval(`[${newValue}]`)
            break
        case 'ylim':
            this.ylim = eval(`[${newValue}]`)
            break
        case 'lineWidth':
              this.xlineWidth = eval(`${newValue}`)
              break
        case 'lineWidth2':
              this.lineWidth2 = eval(`${newValue}`)
              break
        case 'color':
            this.color = newValue
            break
        case 'ddx':
          this.ddx = tlacu.tick(this.xlim[0],this.xlim[1],eval(newValue))
          break
        case 'ddy':
          this.ddy = tlacu.tick(this.ylim[0],this.ylim[1],eval(newValue))
          break
        case 'dx':
            newValue = tlacu.tick(this.xlim[0],this.xlim[1],eval(newValue))
        case 'xtick'://Falta probar
            this.xtick = eval(`[${newValue}]`)
            break
        case 'dy':
          newValue = tlacu.tick(this.ylim[0],this.ylim[1],eval(newValue))
        case 'ytick'://Falta probar
          this.ytick = newValue
          break
        case 'dpx':
            this.dpx = newValue
            break
        case 'dpy':
              this.dpy = newValue
              break
      }
    }
  }
window.customElements.define('tlacuache-ejes',tlacuache_ejes)
class tlacuache_histograma extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback(){
    
    
  }
  static get observedAttributes() {
    return ['x'];
  }
}
window.customElements.define('tlacuache-histograma', tlacuache_histograma);
class tlacuache_plot extends HTMLElement {
  constructor() {
    super();
    this.x=null
    this.y=null
    this.f=null
    this.color='black'
    this.mark='o'
    this.n=100
    this.size=1
    this.lineWidth=1
  }
  connectedCallback(){
    function coor2P(xs,ys,mark,size,color,lw){
      const x = eval(`[${xs}]`)
      const y = eval(`[${ys}]`)
      let P=''
      const Lx = eval(`[${padre.getAttribute('l_x')}]`)
      const Ly = eval(`[${padre.getAttribute('l_y')}]`)
      if(mark == 'o'){
        for (let k=0;k<x.length;++k){
          P += `<circle r="${size}" cx="${Lx[0]*x[k]+Lx[1]}" cy="${Ly[0]*y[k]+Ly[1]}" fill="none" stroke="${color}" stroke-width="${lw}"/>`
        }
      }else if(mark == '.'){
        for (let k=0;k<x.length;++k){
          P += `<circle r="${0.8*size}" cx="${Lx[0]*x[k]+Lx[1]}" cy="${Ly[0]*y[k]+Ly[1]}" fill="${color}"/>`
        }
      }else if(mark == '-'){
        for (let k=0;k<x.length;++k){
          P += `${Lx[0]*x[k]+Lx[1]},${Ly[0]*y[k]+Ly[1]} `
          
        }
        return `<polyline points="${P}" style="fill:none;stroke:${color};stroke-width:${0.8*size}"/>`
      }

      return P
      
    }
    function coor2f(f,n,color,lw){
      const xl = eval(`[${padre.getAttribute('xlim')}]`)
      const x = tlacu.linspace(xl[0],xl[1],n)
      const y = tlacu.evaluar(f,x)
      const Lx = eval(`[${padre.getAttribute('l_x')}]`)
      const Ly = eval(`[${padre.getAttribute('l_y')}]`)
      let puntos=''
      for(let k=0; k<x.length; ++k){
        puntos += `${Lx[0]*x[k]+Lx[1]},${Ly[0]*y[k]+Ly[1]} `
      }
      return `<polyline points="${puntos}" style="fill:none;stroke:${color};stroke-width:${lw}"/>`
      
    }
    //Esta pendiente este elemento
    const padre = this.parentElement;
    const svg = padre.getElementsByTagName('svg')[0].getElementsByTagName('svg')[0];
    const escala=Math.min(svg.getAttribute('width')*0.1,svg.getAttribute('height')*0.012)
    
    let contenido = ''
    if(this.x != null && this.y != null){
      contenido += coor2P(this.x,this.y,this.mark,this.size*escala,this.color,this.lineWidth*escala*0.5)
    }else if(this.f != null){
      contenido += coor2f(this.f,this.n,this.color,this.lineWidth*escala*0.5)
      //f,n,color,lw
    }
    svg.innerHTML +=contenido
  }
  static get observedAttributes() {
    return ['x','y', 'f','color','n','mark','lineWidth','size']
  }
  attributeChangedCallback(name, oldValue, newValue) {
    switch(name){
      case 'f':
          this.f = newValue
          break
      case 'lineWidth':
            this.lineWidth = eval(newValue)
      case 'size':
            this.size = eval(newValue)
      case 'color':
          this.color = newValue
          break
      case 'y'://Falta probar
          this.y = eval(`[${newValue}]`)
            break
      case 'x'://Falta probar
          this.x = eval(`[${newValue}]`)
            break
      case 'mark'://Falta probar
            this.mark = newValue
              break
          
    }
  }
}
window.customElements.define('tlacuache-plot', tlacuache_plot);
class tlacuache_venn extends HTMLElement {
  constructor() {
    super();
    // element created
    this.S1 = null
    this.S2 = null
    this.S3 = null
    this.S4 = null
    this.S5 = null
    this.S6 = null
    this.S7 = null
    this.S8 = null
    this.width = null
    this.n=2
    this.sets=["A","B","C"]
  }
  connectedCallback() {
    if(this.width==null){
      this.innerHTML=`<div><fieldset>
<legend>tlacuache-venn:</legend>

Sintaxis:<br><br>
<table>
          <tr><td>ancho:</td></tr>
          <tr><td></td><td>ancho de pixeles, altura se toma automáticamente</td></tr>
          <tr><td>n: </td></tr>
          <tr><td></td><td>número de conjuntos a dibujar ( 2 o 3, por default 2)</td></tr>
          <tr><td>Conjuntos:<br>
          <tr><td></td><td>Nombre de los conjuntos</td></tr>
          <tr><td>s[1-8]:<br>
          <tr><td></td><td>Nombre de la región $i$-ésima</td></tr>
          </table>
          <p><i>Usar expresiones pequeñas en las áreas cuando se use expresiones matemáticas</i></p>

Ejemplo:<br><br>
  &lt;tlacuache-venn ancho="400" &gt;&lt;/tlacuache-venn&gt;<br>
  &lt;tlacuache-venn ancho="400" s1="\\$\\$\\ omega\\$\\$" s2="0.3" s3="\\$\\$\\frac{1}{3}\\$\\$" s4="w"&gt;&lt;/tlacuache-venn&gt;

</fieldset></div>`
return
    }
    
    const ancho = this.width
    let S = ``
    if(this.n==2){
      const alto = ancho/1.618
      S+=`<svg "http://www.w3.org/2000/svg" height="${alto}" width="${ancho}">
      <text font-size="${ancho*0.09}" text-anchor="end" x="${0.35*ancho-0.5*alto/(1.2*1.41)}" y="${alto/2-0.5*alto/(1.2*1.41)}" >${this.sets[0]}</text>
        <text font-size="${ancho*0.09}" text-anchor="start" x="${0.65*ancho+0.5*alto/(1.2*1.41)}" y="${alto/2-0.5*alto/(1.2*1.41)}" >${this.sets[1]}</text>
      <rect  width="${ancho-2}" height="${alto-2}" x="1" y="1" fill="none" stroke="black" stroke-width="2" />
        <circle cx="${0.35*ancho}" cy="${alto/2}" r="${0.5*alto/1.2}" fill="none" stroke="black" stroke-width="2" />
        <circle cx="${0.65*ancho}" cy="${alto/2}" r="${0.5*alto/1.2}" fill="none" stroke="black" stroke-width="2" />
        <text font-size="${ancho*0.09}" x="3" y="3" alignment-baseline="hanging">U</text>`
        
        if(typeof this.S1 === 'string'){
            if(!this.S1.includes("$$")) S += `<text font-size="${ancho*0.09}" text-anchor="end" x="${ancho-4}" y="${alto-4}">${this.S1}</text>`
            else if(this.S1.includes("$$")) S +=`<foreignObject x="${ancho*.85}" y="${alto-ancho*.2-4}" width="${ancho*.15}" height="${ancho*.20}" >    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Times; font-size:${this.S1.includes('\\frac')?ancho*0.045:ancho*0.09};text-align: rigth;width: fit-content;">${this.S1}</div></foreignObject>`
        }
        if(typeof this.S2 === 'string'){
          if(!this.S2.includes("$$")) S += `<text font-size="${ancho*0.09}" text-anchor="end" x="${0.35*ancho}" y="${alto/2}">${this.S2}</text>`
          else if(this.S2.includes("$$")) S +=`<foreignObject x="${ancho*.2}" y="${alto/2-ancho*.1}" width="${ancho*.15}" height="${ancho*.20}" >    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Times; font-size:${this.S2.includes('\\frac')?ancho*0.045:ancho*0.09};text-align: rigth;width: fit-content;">${this.S2}</div></foreignObject>`
        }
        if(typeof this.S3 === 'string'){
          if(!this.S3.includes("$$")) S += `<text font-size="${ancho*0.09}" text-anchor="middle" x="${ancho/2}" y="${alto/2}">${this.S3}</text>`
          else if(this.S3.includes("$$")) S +=`<foreignObject x="${ancho*(0.5-.15/2)}" y="${alto/2-ancho*.1}" width="${ancho*.15}" height="${alto/2-ancho*.1}" >    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Times; font-size:${this.S3.includes('\\frac')?ancho*0.045:ancho*0.09};text-align: rigth;width: fit-content;">${this.S3}</div></foreignObject>`
        }
        if(typeof this.S4 === 'string'){
          if(!this.S4.includes("$$")) S += `<text font-size="${ancho*0.09}" text-anchor="start" x="${ancho*.65}" y="${alto/2}">${this.S4}</text>`
          else if(this.S4.includes("$$")) S +=`<foreignObject x="${ancho*.61}" y="${alto/2-ancho*.1}" width="${ancho*.15}" height="${ancho*.20}" >    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Times; font-size:${this.S4.includes('\\frac')?ancho*0.045:ancho*0.09};text-align: rigth;width: fit-content;">${this.S4}</div></foreignObject>`
        }
    }else if(this.n==3){
      const alto = this.width
      const alfa=0.19, radio = 0.28*alto
      S+=`<svg "http://www.w3.org/2000/svg" height="${alto}" width="${ancho}">
      <text font-size="${ancho*0.09}" text-anchor="end" x="${0.5*alfa*ancho}" y="${alto/2-0.5*alto/(1.2*1.41)}" >${this.sets[0]}</text>
        <text font-size="${ancho*0.09}" text-anchor="start" x="${this.width-0.5*alfa*ancho}" y="${alto/2-0.5*alto/(1.2*1.41)}" >${this.sets[1]}</text>
        <text font-size="${ancho*0.09}" text-anchor="start" x="${this.width-1.5*alfa*ancho}" y="${alto*.98}" >${this.sets[2]}</text>
      <rect  width="${ancho-2}" height="${alto-2}" x="1" y="1" fill="none" stroke="black" stroke-width="2" />
        <circle cx="${ancho/2+alfa*ancho*Math.sin(0*2*Math.PI)}" cy="${ancho/2+alfa*ancho*Math.cos(0*2*Math.PI)}" r="${radio}" fill="none" stroke="black" stroke-width="2" />
        <circle cx="${ancho/2+alfa*ancho*Math.sin(1*2*Math.PI/3)}" cy="${ancho/2+alfa*ancho*Math.cos(1*2*Math.PI/3)}" r="${radio}" fill="none" stroke="black" stroke-width="2" />
        <circle cx="${ancho/2+alfa*ancho*Math.sin(2*2*Math.PI/3)}" cy="${ancho/2+alfa*ancho*Math.cos(2*2*Math.PI/3)}" r="${radio}" fill="none" stroke="black" stroke-width="2" />
        <!--circle cx="${0.65*ancho}" cy="${alto/2}" r="${0.5*alto/1.968}" fill="none" stroke="black" stroke-width="2" /-->
        <text font-size="${ancho*0.09}" x="3" y="3" alignment-baseline="hanging">U</text>`
        
        if(typeof this.S1 === 'string'){
            if(!this.S1.includes("$$")) S += `<text font-size="${ancho*0.09}" text-anchor="end" x="${ancho-4}" y="${alto-4}">${this.S1}</text>`
            else if(this.S1.includes("$$")) S +=`<foreignObject x="${ancho*.85}" y="${alto-ancho*.2-4}" width="${ancho*.15}" height="${ancho*.20}" >    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Times; font-size:${this.S1.includes('\\frac')?ancho*0.045:ancho*0.09};text-align: rigth;width: fit-content;">${this.S1}</div></foreignObject>`
        }
        if(typeof this.S2 === 'string'){
          if(!this.S2.includes("$$")) S += `<text font-size="${ancho*0.09}" text-anchor="end" x="${0.35*ancho}" y="${alto*.4}">${this.S2}</text>`
          else if(this.S2.includes("$$")) S +=`<foreignObject x="${ancho*.2}" y="${alto*.22}" width="${ancho*.15}" height="${ancho*.20}" >    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Times; font-size:${this.S2.includes('\\frac')?ancho*0.045:ancho*0.09};text-align: rigth;width: fit-content;">${this.S2}</div></foreignObject>`
        }
        if(typeof this.S3 === 'string'){
          if(!this.S3.includes("$$")) S += `<text font-size="${ancho*0.09}" text-anchor="middle" x="${ancho/2}" y="${alto*.4}">${this.S3}</text>`
          else if(this.S3.includes("$$")) S +=`<foreignObject x="${ancho*(0.5-.15/2)}" y="${alto*.22}" width="${ancho*.15}" height="${ancho*.2}" >    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Times; font-size:${this.S3.includes('\\frac')?ancho*0.045:ancho*0.09};text-align: rigth;width: fit-content;">${this.S3}</div></foreignObject>`
        }
        if(typeof this.S4 === 'string'){
          if(!this.S4.includes("$$")) S += `<text font-size="${ancho*0.09}" text-anchor="start" x="${ancho*.65}" y="${alto*.4}">${this.S4}</text>`
          else if(this.S4.includes("$$")) S +=`<foreignObject x="${ancho*.61}" y="${alto*.22}" width="${ancho*.15}" height="${ancho*.20}" >    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Times; font-size:${this.S4.includes('\\frac')?ancho*0.045:ancho*0.09};text-align: rigth;width: fit-content;">${this.S4}</div></foreignObject>`
        }
        if(typeof this.S5 === 'string'){
          if(!this.S5.includes("$$")) S += `<text font-size="${ancho*0.09}" text-anchor="end" x="${ancho*.42}" y="${alto*.6}">${this.S5}</text>`
          else if(this.S5.includes("$$")) S +=`<foreignObject x="${ancho*.27}" y="${ancho*.48}" width="${ancho*.15}" height="${ancho*.20}" >    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Times; font-size:${this.S5.includes('\\frac')?ancho*0.045:ancho*0.09};text-align: rigth;width: fit-content;">${this.S5}</div></foreignObject>`
      }
      if(typeof this.S6 === 'string'){
        if(!this.S6.includes("$$")) S += `<text font-size="${ancho*0.09}" alignment-baseline="middle" text-anchor="middle" x="${ancho*.5}" y="${alto*.5}">${this.S6}</text>`
        else if(this.S6.includes("$$")) S +=`<foreignObject x="${ancho*(.5-.15/2)}" y="${alto*.42}" width="${ancho*.15}" height="${ancho*.20}" >    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Times; font-size:${this.S6.includes('\\frac')?ancho*0.045:ancho*0.09};text-align: rigth;width: fit-content;">${this.S6}</div></foreignObject>`
      }
      if(typeof this.S7 === 'string'){
        if(!this.S7.includes("$$")) S += `<text font-size="${ancho*0.09}" text-anchor="start" x="${ancho*.58}" y="${alto*.6}">${this.S7}</text>`
        else if(this.S7.includes("$$")) S +=`<foreignObject x="${ancho*(0.575)}" y="${alto*.48}" width="${ancho*.15}" height="${ancho*.2}" >    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Times; font-size:${this.S7.includes('\\frac')?ancho*0.045:ancho*0.09};text-align: rigth;width: fit-content;">${this.S7}</div></foreignObject>`
      }
      if(typeof this.S8 === 'string'){
        if(!this.S8.includes("$$")) S += `<text font-size="${ancho*0.09}" text-anchor="middle" x="${ancho*.5}" y="${alto*.8}">${this.S8}</text>`
        else if(this.S8.includes("$$")) S +=`<foreignObject x="${ancho*(0.5-.15/2)}" y="${alto*.7}" width="${ancho*.15}" height="${ancho*.20}" >    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Times; font-size:${this.S8.includes('\\frac')?ancho*0.045:ancho*0.09};text-align: rigth;width: fit-content;">${this.S8}</div></foreignObject>`
      }
    }
    this.innerHTML = S + `</svg>`

  
  }

  disconnectedCallback() {
    // browser calls this method when the element is removed from the document
    // (can be called many times if an element is repeatedly added/removed)
  }

  static get observedAttributes() {
    return ['s1','s2','s3','s4','s5','s6','s7','s8','ancho','n','conjuntos'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // called when one of attributes listed above is modified
    switch(name){
      case 's1':
          this.S1 = newValue
          break
      case 's2':
          this.S2 = newValue
          break
      case 's3':
          this.S3 = newValue
          break
      case 's4':
          this.S4 = newValue
          break
      case 's5':
          this.S5 = newValue
          break
      case 's6':
          this.S6 = newValue
          break
      case 's7':
          this.S7 = newValue
          break
      case 's8':
          this.S8 = newValue
          break
      case 'ancho':
          this.width = eval(newValue)
          break
      case 'n':
        this.n = eval(newValue)
        break
      case 'conjuntos':
        //Hay que hacerlo bien ... luego hay que volver aquí
          this.sets = eval(`[${newValue}]`)
          break
    }
  }
}
window.customElements.define('tlacuache-venn',tlacuache_venn)

class tlacuache_poligonoFA extends HTMLElement {
  constructor() {
    super();
    this.x=null
    this.y=null
    this.f=null
    this.color='black'
    this.mark='o'
    this.n=100
    this.lineWidth=1
  }
  connectedCallback(){
    function coor2P(xs,ys,size,color,lw,n=100){
      let x = eval(`[${xs}]`)
      let y = eval(`[${ys}]`)
      let P=''
      const Lx = eval(`[${padre.getAttribute('l_x')}]`)
      const Ly = eval(`[${padre.getAttribute('l_y')}]`)
      //
      for (let k=0;k<x.length;++k){
        x[k]=(Lx[0]*x[k]+Lx[1])
        y[k]=(Ly[0]*y[k]+Ly[1])
      }
      //
      let f = tlacu.interpolate_mono(x,y)
      
      const D=(x[x.length-1]-x[0])/n
      
      for (let k=0; k <= n; ++k) {
        P += `${x[0]+k*D},${f(x[0]+k*D)} `
        
      }
      P = `<polyline points="${P}" fill="none" stroke="${color}" stroke-width="${lw}" />`
      return P
      
    }

    //Esta pendiente este elemento
    const padre = this.parentElement;
    const svg = padre.getElementsByTagName('svg')[0].getElementsByTagName('svg')[0];
    const escala=Math.min(svg.getAttribute('width')*0.1,svg.getAttribute('height')*0.012)
    
    let contenido = coor2P(this.x,this.y,escala,this.color,this.lineWidth*escala*0.5)
    
    svg.innerHTML +=contenido
  }
  static get observedAttributes() {
    return ['x','y','color','n','lineWidth']
  }
  attributeChangedCallback(name, oldValue, newValue) {
    switch(name){
      case 'lineWidth':
            this.lineWidth = eval(newValue)
      case 'size':
            this.size = eval(newValue)
      case 'color':
          this.color = newValue
          break
      case 'y'://Falta probar
          this.y = eval(`[${newValue}]`)
            break
      case 'x'://Falta probar
          this.x = eval(`[${newValue}]`)
            break
          
    }
  }
}
window.customElements.define('tlacuache-poligono-frecuencias-acumuladas', tlacuache_poligonoFA);


//----------Estos elementos son de prueba
class tlacuache_padre extends HTMLElement
  {
    constructor() {
      super();
      // element created
      this.size = null
      this.xlabel = null
      this.ylabel = null
      this.xlim=[-1,1]
      this.ylim=[-1,1]
    }
    connectedCallback() {
      this.setAttribute('att1',0)
      this.setAttribute('att2',1)
      this.innerHTML += `
      <svg width="300" height="300" style="border: solid 3px red" xmlns="http://www.w3.org/2000/svg">
        <rect x="100" y="100" width="200" height="200"  fill="none" stroke="yellow" stroke-width="2"/>
        
        <svg x="10" y="100"  width="280" height="140" style="border: solid 3px red" xmlns="http://www.w3.org/2000/svg">
        <g transform="scale(40,20) matrix(1 0 0 -1 5 5) ">
        <rect x="-1" y="-1" width="2" height="2"  fill="none" stroke="orange" stroke-width="0.05"/>
        </g>
        </svg> 
      </svg>`
    }
  
    static get observedAttributes() {
      return ['size','xlabel', 'ylabel','xlim', 'ylim','lineWidth','lineWidth2','color','Dx','xtick','Dy','ytick']
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      switch(name){
        case 'size':
            this.size = eval(`[${newValue}]`)
            break
        case 'xlabel':
            this.xlabel = newValue
            break
        case 'ylabel':
            this.ylabel = newValue
            break
        case 'xlim':
            this.xlim = eval(`[${newValue}]`)
            break
        case 'ylim':
            this.ylim = eval(`[${newValue}]`)
            break
        case 'lineWidth':
              this.xlineWidth = eval(`${newValue}`)
              break
        case 'lineWidth2':
              this.lineWidth2 = eval(`${newValue}`)
              break
        case 'color':
            this.color = newValue
            break
        case 'Dx':
            newValue = tlacu.tick(this.xmin,this.xmax,newValue)
        case 'xtick'://Falta probar
            this.xtick = newValue
            break
        case 'Dy':
              newValue = tlacu.tick(this.xmin,this.xmax,newValue)
          case 'ytick'://Falta probar
              this.xtick = newValue
              break
            
      }
    }
  } 
window.customElements.define('tlacuache-padre',tlacuache_padre)

class tlacuache_hijo extends HTMLElement
  {
    constructor() {
      super();
      // element created
      this.size = null
      this.xlabel = null
      this.ylabel = null
      this.x=[]
      this.y=[]
    }
    connectedCallback() {
      const padre = this.parentElement;
      let svg = padre.getElementsByTagName("svg")[0].getElementsByTagName("svg")[0]
      const lw = svg.getAttribute('width')
      console.log(`lw: ${lw}`)
      svg.getElementsByTagName("g")[0].innerHTML+=`<polyline points="${this.xlabel}" style="fill:none;stroke:green;stroke-width:.05"/>`
      console.log(`Attributo 0: ${padre.getAttribute('att1')} Attributo 1: ${padre.getAttribute('att2')} ; size:${this.size}`)
      this.innerHTML += `Hijo`
    }
  
    static get observedAttributes() {
      return ['size','xlabel', 'ylabel','xlim', 'ylim','lineWidth','lineWidth2','color','Dx','xtick','Dy','ytick']
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      switch(name){
        case 'size':
            this.size = eval(`[${newValue}]`)
            break
        case 'xlabel':
            this.xlabel = newValue
            break
        case 'ylabel':
            this.ylabel = newValue
            break
        case 'x':
            this.x = eval(`[${newValue}]`)
            break
        case 'y':
            this.y = eval(`[${newValue}]`)
            break
        case 'lineWidth':
              this.xlineWidth = eval(`${newValue}`)
              break
        case 'lineWidth2':
              this.lineWidth2 = eval(`${newValue}`)
              break
        case 'color':
            this.color = newValue
            break
        case 'Dx':
            newValue = tlacu.tick(this.xmin,this.xmax,newValue)
        case 'xtick'://Falta probar
            this.xtick = newValue
            break
        case 'Dy':
              newValue = tlacu.tick(this.xmin,this.xmax,newValue)
          case 'ytick'://Falta probar
              this.xtick = newValue
              break
            
      }
    }
  }
window.customElements.define('tlacuache-hijo',tlacuache_hijo);
