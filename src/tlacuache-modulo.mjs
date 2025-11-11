// tlacuache-modulo.js
export const pregunta = {
    hayRepetidos(arreglo){
        /*
        Esta función se usa para saber si en el arreglo (que son strings) hay algún elemento repetido
        */
    // Usar un Set para detectar duplicados de manera eficiente
    const seen = new Set();
    for (const item of arreglo) {
        if (seen.has(item)) {
            return true;
        }
        seen.add(item);
    }
    return false;
    }
}
 export const poli = {
            simplificar(v){
                //Se debe modificar para que imprima con fracciones en caso de ser
                while(v[0]==0){
                    if(v.length==1) return [0]
                    v.shift();
                }
                const V=[]
                const n=v.length;
                if(n==0) return [0]
                for(let k=0;k<n;++k){
                    if(!Array.isArray(v[k])){
                        if(v[k]!=0) V.push(v[k])
                    }else{
                        let d = tlacu.mcd(v[k])
                        let num = v[k][0]/d
                        let den = v[k][1]/d
                        if(den<0){
                            num = -num
                            den = -den
                        }
                        if(num == 0) V.push(0)
                        else if (den == 1) V.push(num)
                        else V.push([num,den])
                    }
                   
                }
                return V
                
            },
            derivate(v){
                const n=v.length-1
                const d=[]
                for(var k=0;k<n;++k){
                    d.push(v[k]*(n-k))
                }
                return d
            },
            sumar(v1,v2){
                const n1=v1.length
                const n2=v2.length
                const n=Math.max(n1,n2)
                const v1_clone=v1.slice()
                const v2_clone=v2.slice()
                const output=[]
                for(let k=0;k<n-n1;++k) v1_clone.unshift(0)
                for(let k=0;k<n-n2;++k) v2_clone.unshift(0)
                for(let k=0;k<n;++k){
                    output.push(v1_clone[k]+v2_clone[k])
                }
                while(output[0]==0){
                    output.shift()
                }
                return output
                
                
                
            },
            eval (v,x){//Solo un valor
                let y=0
                for(let k=0;k<v.length;++k){
                    y += v[k]*x**(v.length-k-1)
                }
                return y
            },
            evalM(v,x){
                let y=[]
                for(let i=0;i<x.length;++i){
                    y[i] = 0
                    for(let k=0;k<v.length;++k){
                        y[i] += v[k]*x[i]**(v.length-k-1)
                    }
                }
                return y
            },
            raiz (a,b,discriminante,p,q){//a/b*discriminante^(p/q)
                    
                    if(p>0){
                        if(b==1)  return `$ ${(a<0?'-':'')} ${(Math.abs(a)==1?'':Math.abs(a))} \\sqrt[${(q==2?'':q)}]{${discriminante}^{${p==1?'':p}}} $`
                        else return `$${(a<0?'-':'')} \\frac{ ${(Math.abs(a)==1?'':Math.abs(a))} \\sqrt[${(q==2?'':q)}]{${discriminante}^{${p==1?'':p}}}}{${b}}$`
                    }else{
                        return `$${(a<0?'-':'')} \\frac{${Math.abs(a)}} { ${b==1?"":b}\\sqrt[${(q==2?'':q)}]{${discriminante}^{${p==-1?'':-p}}}}$`
                    }
            },
            print(v){
                //Se debe modificar para que imprima con fracciones en caso de ser
                while(v[0]==0){
                    if(v.length==1) return '0'
                    v.shift();
                }

                const n=v.length;
                if(n==0) return '0'
                let S
                
                if(n==1){ //Solo un número
                    if(Array.isArray(v[0])){//Fracción
                        S=`${v[0][0]*v[0][1]<0?"-":""} \\frac{${Math.abs(v[0][0])}}{${Math.abs(v[0][1])}}`
                    }else{
                        S=`${v[0]<0?"-":""} ${Math.abs(v[0])}`
                    }
                    
                    
                }else if(n==2){ 
                    if(Array.isArray(v[0])){//Fracción
                        S=`${v[0][0]*v[0][1]<0?"-":""} \\frac{${Math.abs(v[0][0])}}{${Math.abs(v[0][1])}}x`
                    }else{
                        S=`${v[0]<0?"-":""} ${Math.abs(v[0])==1?'':Math.abs(v[0])} x`
                    }
                }else{
                    if(Array.isArray(v[0])){//Fracción
                        
                        S=`${v[0][0]*v[0][1]<0?"-":""} \\frac{${Math.abs(v[0][0])}}{${Math.abs(v[0][1])}}x^{${n-1}}`
                    }else{
                        S=`${v[0]<0?"-":""} ${Math.abs(v[0])==1?'':Math.abs(v[0])}x^{${n-1}}`
                    }
                }
                
                for(let k=1;k<n;++k){
                    if(!Array.isArray(v[k])){
                        if(v[k]!=0){
                            if(k==n-1){ S+=(v[k]<0?"-":"+")+Math.abs(v[k])
                            }else if(k==n-2){ S+=(v[k]<0?"-":"+")+(Math.abs(v[k])==1?'':Math.abs(v[k]))+"x"
                            }else S+=(v[k]<0?"-":"+")+(Math.abs(v[k])==1?'':Math.abs(v[k]))+"x^"+(n-k-1)
                        }
                    }else{
                        if(v[k][0]!=0){
                            if(k==n-1){ S+=` ${(v[k][0]*v[k][1]<0?"-":"+")} \\frac{${Math.abs(v[k][0])}}{${Math.abs(v[k][1])}}`
                            }else if(k==n-2){ S+=`${(v[k][0]*v[k][1]<0?"-":"+")} \\frac{${Math.abs(v[k][0])}}{${Math.abs(v[k][1])}} x`
                            }else S+= `${(v[k][0]*v[k][1]<0?"-":"+")} \\frac{${Math.abs(v[k][0])}}{${Math.abs(v[k][1])}} x^{${n-k-1}}`
                        }
                    }
                }
                
                S = S.replaceAll(' ','')
                S = S.replace(/\^\{([^}]+)\}/g, "^$1");
                return S
            }
        }
export const stat={
    linReg(x,y){
        if(x=== undefined){
                console.log('Sintaxis:tlacu.stat.linReg([x1,x2,...],[y1,y2,...])')
                console.error("error linReg")
                return null
            }
        
        const n=x.length
        var xm=stat.mean(x)
        var ym=stat.mean(y)
        var Sumxy=0
        var Sx=0
        for(var k=0;k<n;++k){
            Sumxy+=x[k]*y[k]
            Sx+=Math.pow(x[k]-xm,2)
        }
        var m=(Sumxy-n*xm*ym)/(Sx)
        var b=ym-m*xm
        return [m,b]
    },
    mean(x){
        if(x=== undefined){
                console.log('Sintaxis:tlacu.stat.mean([x1,x2,...])')
                console.error("error mean")
                return null
            }
            let S = 0
            const n = x.length
            for(let k=0;k<n;++k){
                S += x[k]
            }
            return S/n
    },
    pearson(x,y){
        if(x=== undefined){
                console.log('Sintaxis:tlacu.stat.pearson([x1,x2,...],[y1,y2,...])')
                console.error("error pearson")
                return null
        }
        const n=x.length
        let Sumxy=0
        let Sumx=0
        let Sumx2=0
        let Sumy=0
        let Sumy2=0
        for(let k=0;k<n;++k){
            Sumx+=x[k]
            Sumx2+=x[k]*x[k]
            Sumy+=y[k]
            Sumy2+=y[k]*y[k]
            Sumxy+=x[k]*y[k]
        }
        return (n*Sumxy-Sumx*Sumy)/Math.sqrt((n*Sumx2-Sumx*Sumx)*(n*Sumy2-Sumy*Sumy))
    },
    //-------------------------
    spearman(arr1, arr2) {
        // Verificar si las longitudes de los arreglos son iguales
        if (arr1.length !== arr2.length) {
            throw new Error('Los arreglos tienen longitudes diferentes');
        }

        // Crear copias de los arreglos originales
        const arr1Copy = arr1.slice();
        const arr2Copy = arr2.slice();

        // Función de clasificación para obtener los rangos
        function compare(a, b) {
            return a - b;
        }

        // Clasificar los arreglos y obtener los rangos
        arr1Copy.sort(compare);
        arr2Copy.sort(compare);

        // Función para obtener los rangos de los elementos en el arreglo
        function obtenerRangos(arr) {
            const ranks = {};
            for (let i = 0; i < arr.length; i++) {
                const val = arr[i];
                if (ranks[val] === undefined) {
                    ranks[val] = [i + 1];
                } else {
                    ranks[val].push(i + 1);
                }
            }
            return ranks;
        }

        // Obtener los rangos de los arreglos
        const ranks1 = obtenerRangos(arr1Copy);
        const ranks2 = obtenerRangos(arr2Copy);

        // Calcular la diferencia de rangos al cuadrado
        let dSquared = 0;
        for (let i = 0; i < arr1Copy.length; i++) {
            const diff = ranks1[arr1[i]].reduce((acc, val) => acc + val, 0) / ranks1[arr1[i]].length -
                ranks2[arr2[i]].reduce((acc, val) => acc + val, 0) / ranks2[arr2[i]].length;
            dSquared += diff * diff;
        }

        // Calcular la correlación de Spearman
        const n = arr1Copy.length;
        const spearmanCorrelation = 1 - (6 * dSquared) / (n * (n * n - 1));
        return spearmanCorrelation;
    }

    //-------------------------
}
//Hacer el método del trapecio con estructura como ans={n: n, y:y, x:x ...}
export function metTrapecio(a,b,n,fun){
    const h=(b-a)/n
    const x = linspace(a,b,n+1)
    let y

    if( Array.isArray(fun) )    y = poli.evalM(fun,x)
    else    y = evaluar(fun,x)

    let A = (y[0] + y[y.length - 1])/2
    for (let i = 1; i < y.length - 1; i++) A += y[i];
    A *= h

    return {x:x , y:y, A:A, h:h}
}
export function conv(a1, a2) {
    //Funciona de la misma manera que conv de matlab/octave
    let result = [];
    a1.forEach(function (a, i) {
        a2.forEach(function (b, j) {
            result[i + j] = (result[i + j] || 0) + a * b;
        });
    });
    return result;
}

export function fraccion(a,b,signoAbajo=false){
    if(b==0){
        return `${a<0?'-':''}\\infty`
    }else if(a == 0){
        return 0
    }
    let den = simplify_frac([a,b])
    if( Math.abs(den[1]) == 1 ){
        return den[0]*den[1]
    }
    
    if(!signoAbajo){
        const sig = den[1]<0?-1:1
        const denominador = `${sig*den[0]}`
        const numerador = `${sig*den[1]}`
        if(denominador.length === 1 && numerador.length == 1){
            return `\\frac${denominador}${numerador}`
        }
        return `\\frac{${sig*den[0]}}{${sig*den[1]}}`
    }else{
        const sig = den[0]*den[1]<0?'-':''
        const denominador = `${Math.abs(den[0])}`
        const numerador = `${Math.abs(den[1])}`
        if(denominador.length === 1 && numerador.length == 1){
            return `${sig}\\frac${denominador}${numerador}`
        }
        return `${sig}\\frac{${Math.abs(den[0])}}{${Math.abs(den[1])}}`
    }
    
}
export function simplify_frac(a){
	/* [5,3] <- simplify_frac([10,6]) solo dos valores*/
	let mcd = mcd_new(a[0],a[1])
	mcd *= mcd*a[1]<0?-1:1
	return [a[0]/mcd,a[1]/mcd]
}
function mcd_new(a, b) {
	if (b === 0) return a;
	return mcd_new(b, a % b);
  }
export function linspace(x_min,x_max,n=100){
    const x=[]
    const h=(x_max-x_min)/(n-1)
    for(let k=0;k<n;++k) x.push(x_min+k*h)
    return x
}
export function evaluar(expresion,X){
    const y = []
    X.forEach((x) => {
        y.push(eval(expresion));
        });
        return y
}
export const graph = {
    tick(vmin,vmax,step){
            /*
            Ejemplo
            graph.tick(10,20,3)
            */ 
           console.log(vmin,vmax,step)
            let list=[Math.floor(vmin/step)*step]
            console.log(list)
            while(list[list.length-1]+step<=vmax){
                list.push(list[list.length-1]+step)
            }
            return list
        },

}
export function NotacionCientifica(num){
    let numInSciNot = {};
    [numInSciNot.coefficient, numInSciNot.exponent] =num.toExponential().split('e').map(item => Number(item));
    const q= numInSciNot.exponent.toString()
    return `${(numInSciNot.coefficient).toFixed(2)}\\times10^${q.length>1?'{':''}${numInSciNot.exponent}${q.length>1?'}':''}`
}
export function interpolate_mono(xs, ys) {
            let i, length = xs.length;
            if (length != ys.length) { throw 'Need an equal count of xs and ys.'; }
            if (length === 0) { return function(x) { return 0; }; }
            if (length === 1) {
                let result = +ys[0];
                return function(x) { return result; };
            }
            let indexes = [];
            for (i = 0; i < length; i++) { indexes.push(i); }
            indexes.sort(function(a, b) { return xs[a] < xs[b] ? -1 : 1; });
            let oldXs = xs, oldYs = ys;
            xs = []; ys = [];
            for (i = 0; i < length; i++) { xs.push(+oldXs[indexes[i]]); ys.push(+oldYs[indexes[i]]); }
            let dys = [], dxs = [], ms = [];
            for (i = 0; i < length - 1; i++) {
                let dx = xs[i + 1] - xs[i], dy = ys[i + 1] - ys[i];
                dxs.push(dx); dys.push(dy); ms.push(dy/dx);
            }
            let c1s = [ms[0]];
            for (i = 0; i < dxs.length - 1; i++) {
                let m = ms[i], mNext = ms[i + 1];
                if (m*mNext <= 0) {
                    c1s.push(0);
                } else {
                    let dx = dxs[i], dxNext = dxs[i + 1], common = dx + dxNext;
                    c1s.push(3*common/((common + dxNext)/m + (common + dx)/mNext));
                }
            }
            c1s.push(ms[ms.length - 1]);
            let c2s = [], c3s = [];
            for (i = 0; i < c1s.length - 1; i++) {
                let c1 = c1s[i], m = ms[i], invDx = 1/dxs[i], common = c1 + c1s[i + 1] - m - m;
                c2s.push((m - c1 - common)*invDx); c3s.push(common*invDx*invDx);
            }
        
            return function(x) {
                let i = xs.length - 1;
                if (x == xs[i]) { return ys[i]; }
                let low = 0, mid, high = c3s.length - 1;
                while (low <= high) {
                    mid = Math.floor(0.5*(low + high));
                    let xHere = xs[mid];
                    if (xHere < x) { low = mid + 1; }
                    else if (xHere > x) { high = mid - 1; }
                    else { return ys[mid]; }
                }
                i = Math.max(0, high);
                const diff = x - xs[i], diffSq = diff*diff;
                return ys[i] + c1s[i]*diff + c2s[i]*diffSq + c3s[i]*diff*diffSq;
            };
}
export function financiera(N,I, PV,PMT,FV,PY,CY){//Versión 1
            /*
            Inspirada en la función financiera de TI-84 CE
            N: Número de periodos
            I: Tasa de interés
            PV: Valor presente
            FV: Valor futuro
            PY: Pago anual
            CY: Pago por periodo

            Para calcular una variable se debe poner como null
            e.g. tlacu.MatFinanciera.NM(12,10,-1000,null,2,2) para calcular el FV
            */
            if(PMT==0 && PY==CY){
                if (N==null){
                    return Math.log(FV / PV) / Math.log(1 + I / (100*CY));
                }else if (I == null){
                    return ((FV / PV) ** (1 / N) - 1) * 100 * CY;
                } else if (PV == null){
                    PV = FV / ((1 + I / (100 * CY)) ** N);
                    return PV;
                }else if (FV == null){
                    FV = PV * ((1 + I / (100 * CY)) ** N);
                    return FV;
                }else {
                    return "No implementado 84258";
                }
            }else{
                return "No implementado 869"
            }

            
}
export function cs(num, precision=3) {
    /*
    sintaxis cs(numero, cifras significativas)
    */
   let num2=Math.abs(num)
   const maxP10=Math.ceil(Math.log10(num2))
   const minP10=maxP10-precision
   //if(precision==3) console.log(`min: ${minP10}`)
  if (minP10>=0){
    num2 = Number(num.toPrecision(precision))
    return num2.toString()
  }else return num.toFixed(-minP10)
}
export function unsortArray(b) {
        let a=b
        a.sort(function(){return 0.5 - Math.random()});
        return a
    }
export function TipoRelacionesDiagAsig(tipo,DI=[[1,2,3,4,5],[1,2,3,4,5]],size=[240,150]){
    
    const n=[DI[0].length,DI[1].length]
    let Asignationx=[],Asignationy=[],Relation=[]

    switch(tipo){
        case 'RS':
            let noRepeat
            for(let k=0;k<n[0];++k){
                do{
                    Relation.push([k,Math.floor(Math.random()*n[1])])
                }while(Math.random()<0.2)
            }
            do{
                noRepeat=[Math.floor(Math.random()*n[0]),Math.floor(Math.random()*n[1])]
            }while(noRepeat[1]==Relation[noRepeat[0]][1])
            Relation.push(noRepeat)
            break
        case 'RNS':
            const ElEmpty=Math.floor(Math.random()*n[0])
            let ElRep, NoRepeat,dummy

            do{
                for(let k=0;k<n[0];++k){
                    if(k!=ElEmpty){
                        if( Math.random()<0.8 ){
                            Relation.push([ Math.floor(Math.random()*n[0]),
                                            Math.floor(Math.random()*n[1])])
                        }
                    }
                }
            }while(Relation.length==0)
            ElRep=Math.floor(Math.random()*Relation.length)
            do{
                dummy=Math.floor(Math.random()*n[1])
            }while(Relation[ElRep][1]==dummy)
            Relation.push([Relation[ElRep][0],dummy])
            break
        case 'FB':
            if(n[0]>n[1]){
                alert('No es posible hacer una función biyectiva con x='+DI[0]+' y='+DI[1])
            }
            
            for(let k=0;k<n[0];++k) Asignationy.push(k)
            Asignationy=unsortArray(Asignationy)
            for(let k=0;k<n[0];++k) Relation.push([k,Asignationy[k]])        
            break
        case 'FSNI':
            if(n[0]>n[1]){
                alert('Verifica las condiciones para hacer una FSNI con x='+DI[0]+' y='+DI[1])
            }
            for(let k=0;k<n[0];++k){
                Asignationy.push(k)
                Asignationx.push(k)
            }
            Asignationy=unsortArray(Asignationy)
            Asignationx=unsortArray(Asignationx)
            const dummyFSNI=Math.ceil(Math.random()*(n[0]-1))
            for(let k=0;k<n[0];++k){
                if(k<dummyFSNI) Relation.push([Asignationx[k],Asignationy[k]])
                else        Relation.push([Asignationx[k],Asignationy[Math.floor(Math.random()*(n[0]-dummyFSNI))]])        
            } 
            break
        case 'FNSNI':
            if(n[0]>n[1]){
                alert('Verifica las condiciones para FNSNI con x='+DI[0]+' y='+DI[1])
            }
            const dummyFNSNI=[Math.ceil(Math.random()*(n[0]-3))+2]
            do{
                dummyFNSNI[1]=Math.ceil(Math.random()*(dummyFNSNI[0]-1))
            }while(dummyFNSNI[1]<1)
            for(let k=0;k<n[0];++k){
                Asignationy.push(k)
                Asignationx.push(k)
            }
            
            Asignationy=unsortArray(Asignationy)
            Asignationx=unsortArray(Asignationx)
            Asignationx=Asignationx.slice(0, dummyFNSNI[0])
            Asignationy=Asignationy.slice(0, dummyFNSNI[0])
            for(let k=0;k<dummyFNSNI[0];++k){
                if(k<dummyFNSNI[1]) Relation.push([Asignationx[k],Asignationy[k]])
                else        Relation.push([ Asignationx[k],
                                            Asignationy[Math.floor(Math.random()*dummyFNSNI[1])]
                                        ])
            } 
            break
        case 'FNSI':
            if(n[0]>n[1]){
                alert('Verifica las condiciones para FNSI con x='+DI[0]+' y='+DI[1])
            }
            const dummyFNSI=Math.ceil(Math.random()*(n[0]-3))+2
            
            for(let k=0;k<n[0];++k){
                Asignationy.push(k)
                Asignationx.push(k)
            }
            
            Asignationy=unsortArray(Asignationy)
            Asignationx=unsortArray(Asignationx)
            Asignationx=Asignationx.slice(0, dummyFNSI)
            Asignationy=Asignationy.slice(0, dummyFNSI)
            for(let k=0;k<dummyFNSI;++k){
                Relation.push([Asignationx[k],Asignationy[k]])
            } 
            break
    }
    return diagramaAsignacion([DI[0],DI[1],Relation],size)
}

export function diagramaAsignacion(txtElem,size=[480,300]){
	/*Ejemplo
	diagramaAsignacion([	[9,5,8,7,4,6],
							['a','e','w'],
							[[0,0],[0,1],[2,2]] ],
							[480,300])
	*/
	let svg=document.createElementNS("http://www.w3.org/2000/svg","svg")
		svg.setAttribute('width',size[0])
		svg.setAttribute('height',size[1])
		//Vamos a definir las flechas
		let def=document.createElementNS("http://www.w3.org/2000/svg","defs")
			let marker=document.createElementNS("http://www.w3.org/2000/svg","marker")
			marker.setAttribute('id','head')
			marker.setAttribute('orient','auto')
			marker.setAttribute('markerWidth',3)
			marker.setAttribute('markerHeight',4)
			marker.setAttribute('refX',0.1)
			marker.setAttribute('refY',2)
				let path=document.createElementNS("http://www.w3.org/2000/svg","path")
				path.setAttribute('d','M0,0 V4 L2,2 Z')
				path.setAttribute('fill','gray')
				marker.appendChild(path)
			def.appendChild(marker)
		svg.appendChild(def)

	
	let ellipse=document.createElementNS("http://www.w3.org/2000/svg","ellipse")
		ellipse.setAttribute('rx',(size[0]/4-5)*.8)
		ellipse.setAttribute('ry',size[1]/2-10)
		ellipse.setAttribute('cx',size[0]*0.20)
		ellipse.setAttribute('cy',size[1]*0.5)
		ellipse.setAttribute('fill','none')
		ellipse.setAttribute('stroke','blue')
		ellipse.setAttribute('stroke-width',3)
	svg.appendChild(ellipse)
	ellipse=document.createElementNS("http://www.w3.org/2000/svg","ellipse")
		ellipse.setAttribute('rx',(size[0]/4-5)*.8)
		ellipse.setAttribute('ry',size[1]/2-10)
		ellipse.setAttribute('cx',size[0]*0.80)
		ellipse.setAttribute('cy',size[1]*0.5)
		ellipse.setAttribute('fill','none')
		ellipse.setAttribute('stroke','blue')
		ellipse.setAttribute('stroke-width',3)
	svg.appendChild(ellipse)
	
	// Aqui van las flechas
	let a=size[0]*0.1
	let b=size[1]*0.9
	let D=[(b-a)/(txtElem[0].length-1),(b-a)/(txtElem[1].length-1)]
	for(let k=0;k<txtElem[2].length;++k){
	
		path=document.createElementNS("http://www.w3.org/2000/svg","path")
		path.setAttribute('stroke','gray')
		path.setAttribute('marker-end','url(#head)')
		path.setAttribute('stroke-width','3')
		path.setAttribute('fill','none')
		path.setAttribute('d','M'+(size[0]*0.20+10)+','+(a+txtElem[2][k][0]*D[0])+', '+(size[0]*0.80-10)+','+(a+txtElem[2][k][1]*D[1]) )
		svg.appendChild(path)
	}

	D=(b-a)/(txtElem[0].length-1)
	let txt
	for(let k=0;k<txtElem[0].length;++k){
		txt=document.createElementNS("http://www.w3.org/2000/svg","text")
		txt.setAttribute('stroke','black')
		txt.setAttribute('x',size[0]*0.20)
		txt.setAttribute('y',a+k*D)
		txt.setAttribute("text-anchor","middle")
		txt.setAttribute("alignment-baseline","middle")
		txt.textContent=txtElem[0][k]
		svg.appendChild(txt)		
	}

	D=(b-a)/(txtElem[1].length-1)
	for(let k=0;k<txtElem[1].length;++k){
		txt=document.createElementNS("http://www.w3.org/2000/svg","text")
		txt.setAttribute('stroke','black')
		txt.setAttribute('x',size[0]*0.80)
		txt.setAttribute('y',a+k*D)
		txt.setAttribute("text-anchor","middle")
		txt.setAttribute("alignment-baseline","middle")
		txt.textContent=txtElem[1][k]
		svg.appendChild(txt)		
	}
    let center = document.createElement('div')
    //center.style.textAlign = "center";
    center.appendChild(svg)
	return center.outerHTML
}

export function tipoRelacion(tipo,DI=[[-5,-4,-3,-2,-1,0,1,2,3,4,5],[-5,-4,-3,-2,-1,0,1,2,3,4,5]]){
    
    const n=[DI[0].length,DI[1].length]
    let Asignationx=[],Asignationy=[],Relation=[]

    switch(tipo){
        case 'RS':
            let noRepeat
            for(let k=0;k<n[0];++k){
                do{
                    Relation.push([k,Math.floor(Math.random()*n[1])])
                }while(Math.random()<0.2)
            }
            do{
                noRepeat=[Math.floor(Math.random()*n[0]),Math.floor(Math.random()*n[1])]
            }while(noRepeat[1]==Relation[noRepeat[0]][1])
            Relation.push(noRepeat)
            break
        case 'RNS':
            const ElEmpty=Math.floor(Math.random()*n[0])
            let ElRep, NoRepeat,dummy

            do{
                for(let k=0;k<n[0];++k){
                    if(k!=ElEmpty){
                        if( Math.random()<0.8 ){
                            Relation.push([ Math.floor(Math.random()*n[0]),
                                            Math.floor(Math.random()*n[1])])
                        }
                    }
                }
            }while(Relation.length==0)
            ElRep=Math.floor(Math.random()*Relation.length)
            do{
                dummy=Math.floor(Math.random()*n[1])
            }while(Relation[ElRep][1]==dummy)
            Relation.push([Relation[ElRep][0],dummy])
            break
        case 'FB':
            if(n[0]>n[1]){
                alert('No es posible hacer una función biyectiva con x='+DI[0]+' y='+DI[1])
            }
            
            for(let k=0;k<n[0];++k) Asignationy.push(k)
            Asignationy=unsortArray(Asignationy)
            for(let k=0;k<n[0];++k) Relation.push([k,Asignationy[k]])        
            break
        case 'FSNI':
            if(n[0]>n[1]){
                alert('Verifica las condiciones para hacer una FSNI con x='+DI[0]+' y='+DI[1])
            }
            for(let k=0;k<n[0];++k){
                Asignationy.push(k)
                Asignationx.push(k)
            }
            Asignationy=unsortArray(Asignationy)
            Asignationx=unsortArray(Asignationx)
            const dummyFSNI=Math.ceil(Math.random()*(n[0]-1))
            for(let k=0;k<n[0];++k){
                if(k<dummyFSNI) Relation.push([Asignationx[k],Asignationy[k]])
                else        Relation.push([Asignationx[k],Asignationy[Math.floor(Math.random()*(n[0]-dummyFSNI))]])        
            } 
            break
        case 'FNSNI':
            if(n[0]>n[1]){
                alert('Verifica las condiciones para FNSNI con x='+DI[0]+' y='+DI[1])
            }
            const dummyFNSNI=[Math.ceil(Math.random()*(n[0]-3))+2]
            do{
                dummyFNSNI[1]=Math.ceil(Math.random()*(dummyFNSNI[0]-1))
            }while(dummyFNSNI[1]<1)
            for(let k=0;k<n[0];++k){
                Asignationy.push(k)
                Asignationx.push(k)
            }
            
            Asignationy=unsortArray(Asignationy)
            Asignationx=unsortArray(Asignationx)
            Asignationx=Asignationx.slice(0, dummyFNSNI[0])
            Asignationy=Asignationy.slice(0, dummyFNSNI[0])
            for(let k=0;k<dummyFNSNI[0];++k){
                if(k<dummyFNSNI[1]) Relation.push([Asignationx[k],Asignationy[k]])
                else        Relation.push([ Asignationx[k],
                                            Asignationy[Math.floor(Math.random()*dummyFNSNI[1])]
                                        ])
            } 
            break
        case 'FNSI':
            if(n[0]>n[1]){
                alert('Verifica las condiciones para FNSI con x='+DI[0]+' y='+DI[1])
            }
            const dummyFNSI=Math.ceil(Math.random()*(n[0]-3))+2
            
            for(let k=0;k<n[0];++k){
                Asignationy.push(k)
                Asignationx.push(k)
            }
            
            Asignationy=unsortArray(Asignationy)
            Asignationx=unsortArray(Asignationx)
            Asignationx=Asignationx.slice(0, dummyFNSI)
            Asignationy=Asignationy.slice(0, dummyFNSI)
            for(let k=0;k<dummyFNSI;++k){
                Relation.push([Asignationx[k],Asignationy[k]])
            } 
            break
    }
    const arreglo = []
    for(let k=0;k<Relation.length;++k){
        arreglo.push([DI[0][Relation[k][0]] , DI[1][Relation[k][1]]])
    }
    //console.log(arreglo)
    return arreglo
    //return diagramaAsignacion([DI[0],DI[1],Relation],[480,300])
}
export function mcm(numeros) {// Mínimo común múltiplo
            function calcularMCD(a, b) {
                a = Math.abs(a);
                b = Math.abs(b);
                while (b !== 0) {
                    let temp = b;
                    b = a % b;
                    a = temp;
                }  
                return a;
            }
            function calcularMCMDosNumeros(a, b) {
                return Math.abs(a * b) / calcularMCD(a, b);
            }
            if (!Array.isArray(numeros)) {
                throw new Error("La entrada debe ser un arreglo");
            }

            if (numeros.length === 0) {
                throw new Error("El arreglo no puede estar vacío");
            }

            if (numeros.some(num => !Number.isInteger(num))) {
                throw new Error("Todos los elementos deben ser números enteros");
            }
            if (numeros.length === 1) {
                return Math.abs(numeros[0]);
            }
            let mcm = calcularMCMDosNumeros(numeros[0], numeros[1]);
            for (let i = 2; i < numeros.length; i++) {
            mcm = calcularMCMDosNumeros(mcm, numeros[i]);
            }
            return mcm;
        }
export function mcd(numeros) {//maximo comun denominador
            // Filtrar ceros y tomar valor absoluto
            let nums = numeros.filter(num => num !== 0).map(num => Math.abs(num));
            if (nums.length === 0) {
                throw new Error("La lista no contiene números distintos de cero");
            }
            // Función auxiliar para MCD de dos números
            function mcdDos(a, b) {
                while (b !== 0) {
                    let temp = b;
                    b = a % b;
                    a = temp;
                }
                return a;
            }
            // Reducir la lista usando mcdDos
            return nums.reduce((acc, val) => mcdDos(acc, val));
        }

//Abajo no debe tomarse en cuenta
const tlacu = (function() {

    return {
        mcd: function(numeros) {
            // Filtrar ceros y tomar valor absoluto
            let nums = numeros.filter(num => num !== 0).map(num => Math.abs(num));
            if (nums.length === 0) {
                throw new Error("La lista no contiene números distintos de cero");
            }
            // Función auxiliar para MCD de dos números
            function mcdDos(a, b) {
                while (b !== 0) {
                    let temp = b;
                    b = a % b;
                    a = temp;
                }
                return a;
            }
            // Reducir la lista usando mcdDos
            return nums.reduce((acc, val) => mcdDos(acc, val));
        },
        mcm:function(numeros) {
            function calcularMCD(a, b) {
                a = Math.abs(a);
                b = Math.abs(b);
                while (b !== 0) {
                    let temp = b;
                    b = a % b;
                    a = temp;
                }  
                return a;
            }
            function calcularMCMDosNumeros(a, b) {
                return Math.abs(a * b) / calcularMCD(a, b);
            }
            if (!Array.isArray(numeros)) {
                throw new Error("La entrada debe ser un arreglo");
            }

            if (numeros.length === 0) {
                throw new Error("El arreglo no puede estar vacío");
            }

            if (numeros.some(num => !Number.isInteger(num))) {
                throw new Error("Todos los elementos deben ser números enteros");
            }
            if (numeros.length === 1) {
                return Math.abs(numeros[0]);
            }
            let mcm = calcularMCMDosNumeros(numeros[0], numeros[1]);
            for (let i = 2; i < numeros.length; i++) {
            mcm = calcularMCMDosNumeros(mcm, numeros[i]);
            }
            return mcm;
        },
        mediatriz: function (p1,p2) {
            //p1 y p2 son arreglos de dos elementos [x,y]
            const mx = (p1[0] + p2[0]) / 2;
            const my = (p1[1] + p2[1]) / 2;
            let dx = p2[0] - p1[0];
            let dy = p2[1] - p1[1];
            if (dx === 0 && dy === 0) {
                throw new Error("Los puntos no pueden ser iguales");
            }
            if (dx === 0) {
                // Recta vertical, bisectriz es horizontal
                // y = my
                return { general: `y = ${my}`, PO: `y = ${my}`};// Forma general y pendiente ordenada al origen
            }
            if (dy === 0) {
                // Recta horizontal, bisectriz es vertical
                // x = mx
                return { general: `x = ${mx}`, PO: `x = ${mx}`};// Forma general y pendiente ordenada al origen
            }
            let A = dx
            let B = dy;
            let C = -dx*mx - dy*my;
            console.log("Original:", A,B,C)
            
            let d = tlacu.mcd([A,B,C])*(A<0?-1:1); // Aseguramos que A sea positivo
            A /= d;
            B /= d; 
            C /= d;
            console.log("Modificado:", A,B,C)
            
            return { general: `${A==1?'':A} x ${B<0?'-':'+'} ${Math.abs(B)==1?'':Math.abs(B)} y ${C<0?'-':'+'} ${Math.abs(C)} = 0`,
                     PO: `y = ${tlacu.poli.print(tlacu.poli.simplificar([[-A,B],[-C,B]]))}` };
        },
        stat:{
            cuartil: function(datos){

                    let arr = [...datos]
                    arr.sort((a, b) => a - b)
                      const n = arr.length
                      const q2 = (n + 1) / 2
                      const q1 = Math.ceil(q2) / 2
                      const q3 = 2*q2-q1
                      const getQuartile = (index) => {
                        const pos = Math.floor(index);
                        if (index - pos == 0.5) {
                            return (arr[pos - 1] + arr[pos]) / 2;
                          
                        } else {
                            return arr[Math.round(index - 1)];
                        }
                      };
                      console.log('Revisado ')
                      return [getQuartile(1),getQuartile(q1), getQuartile(q2), getQuartile(q3),getQuartile(n)]
                    
                    
            }

        },
        graph:{
            lienzo: function(size,xlim,ylim,tick, label=["",""]){
                
                let S=`<svg height="${size[0]}" width="${size[1]}" style="border: solid red 2px">
                </svg>`
                let L=[]
                return[L,S]
            }
        },
        custom:{
            string2array: function(raw){
                return raw.split(',');
            }
        },
        
        metNum:{
            newton: function(f,df,x0,maxIter=5,op=true){
                let x = x0
                let iter = 0
                let cadena = "<table class='tlacuache_tabla_dato'><tr style='border_bottom:solid 2px black'><td>It</td><td>$a$</td><td>$f(a)$</td><td>$m_l$ </td><td>$b_l$ </td><td>$x_n$ </td></tr>"
                while(iter<maxIter){
                    cadena += `<tr><td>${iter+1}</td><td>${x.toPrecision(3)}</td><td>${f(x).toPrecision(3)}</td><td>${df(x).toPrecision(3)}</td><td>${(-x*df(x)+f(x)).toPrecision(3)}</td><td>${(x - f(x)/df(x)).toPrecision(3)}</td></tr>`
                    x = x - f(x)/df(x)
                    iter++
                }
                cadena += '</table>'
                return op==true?cadena:x
            },
            secante: function(f,x0,x1,maxIter=5,op=true){
                let iter = 0
                let cadena = "<table class='tlacuache_tabla_dato'><tr style='border_bottom:solid 2px black'><td>It</td><td>$a$</td><td>$b$</td><td>$c$ </td></tr>"
                while(iter<maxIter){
                    cadena += `<tr><td>${iter+1}</td><td>${x0.toPrecision(3)}</td><td>${x1.toPrecision(3)}</td><td>${(x1 - f(x1)*(x1-x0)/(f(x1)-f(x0))).toPrecision(3)}</td></tr>`
                    let x2 = x1 - f(x1)*(x1-x0)/(f(x1)-f(x0))
                    x0 = x1
                    x1 = x2
                    iter++
                }
                cadena += '</table>'
                return op?cadena:x1
            },
            biseccion: function(f,a,b,maxIter=5,op=true){
                let iter = 0
                let cadena = "<table class='tlacuache_tabla_dato'><tr style='border_bottom:solid 2px black'><td>It</td><td>$a$</td><td>$b$</td><td>$c$ </td></tr>"
                let fa = f(a), fb=f(b), fc
                while(iter<maxIter){
                    let c = (a+b)/2
                    fc = f(c)
                    cadena += `<tr><td>${iter+1}</td><td>${a.toPrecision(3)}(${fa<0?'-':'+'})</td><td>${b.toPrecision(3)}(${fb<0?'-':'+'})</td><td>${c.toPrecision(3)}(${fc<0?'-':'+'})</td></tr>`
                    if(f(c) == 0){
                        cadena += '</table>'
                        return op?cadena:c
                    }else if(f(a)*f(c)<0){
                        b = c
                    }else{
                        a = c
                    }
                    iter++
                }
                cadena += '</table>'
                return op?cadena:(a+b)/2
            },
            regulaFalsi: function(f,a,b,tol=1e-8,maxIter=100){
                let error = tol+1
                let iter = 0
                while(error>tol && iter<maxIter){
                    let c = b - f(b)*(b-a)/(f(b)-f(a))
                    if(f(c) == 0){
                        return c
                    }else if(f(a)*f(c)<0){
                        b = c
                    }else{
                        a = c
                    }
                    error = Math.abs(b-a)
                    iter++
                }
                return (a+b)/2
            },
            puntoFijo: function(g,x0,tol=1e-8,maxIter=100){
                let x = x0
                let error = tol+1
                let iter = 0
                while(error>tol && iter<maxIter){
                    let x1 = g(x)
                    error = Math.abs(x1-x)
                    x = x1
                    iter++
                }
        }
        }
    };
})();
