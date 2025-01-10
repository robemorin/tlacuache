const tlacu = (function() {

    return {
        linspace: function (x_min,x_max,n=100){
            const x=[]
            const h=(x_max-x_min)/(n-1)
            for(let k=0;k<n;++k) x.push(x_min+k*h)
            return x
        },
        tick: function(vmin,vmax,step){
            /*
            Ejemplo
            tlacu.tick(10,20,3)
            */
            let list=[vmin]
            while(list[list.length-1]+step<=vmax){
                list.push(list[list.length-1]+step)
            }
            return list
        },
        evaluar: function (expresion,X){
            const y = []
            X.forEach((x) => {
              y.push(eval(expresion));
              });
              return y
        },
        NotacionCientifica: function(num){
            var numInSciNot = {};
            [numInSciNot.coefficient, numInSciNot.exponent] =num.toExponential().split('e').map(item => Number(item));
            return (numInSciNot.coefficient).toFixed(2)+"&times;10<sup>"+numInSciNot.exponent+'</sup>';
        },
         polinomio: function(v){
            //Se debe modificar para que imprima con fracciones en caso de ser
            while(v[0]==0){
                if(v.length==1) return '0'
                v.shift();
            }
            const n=v.length;
            let S
            if(n==1){ S=`${v[0]<0?"-":""} ${Math.abs(v[0])}`
            }else if(n==2){ S=(v[0]<0?"-":"")+(Math.abs(v[0])==1?'':Math.abs(v[0]))+"x"
            }else S=(v[0]<0?"-":"")+(Math.abs(v[0])==1?'':Math.abs(v[0]))+"x^{"+(n-1)+"}"
            
            
            for(var k=1;k<n;++k){
                if(v[k]!=0){
        
                if(k==n-1){ S+=(v[k]<0?"-":"+")+Math.abs(v[k])
                }else if(k==n-2){ S+=(v[k]<0?"-":"+")+(Math.abs(v[k])==1?'':Math.abs(v[k]))+"x"
                }else S+=(v[k]<0?"-":"+")+(Math.abs(v[k])==1?'':Math.abs(v[k]))+"x^"+(n-k-1)
        
                }
            }
            return S
        },
        multiply: function (a1, a2) {
            //para polinomios
            var result = [];
            a1.forEach(function (a, i) {
                a2.forEach(function (b, j) {
                    result[i + j] = (result[i + j] || 0) + a * b;
                });
            });
            return result;
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
        fraccion:function(a,b,op=false){

            if(b==0){
                return `${a<0?'-':''}\\infty`
            }else if(a == 0){
                return 0
            }
            let den = simplify_frac([a,b])
            if( Math.abs(den[1]) == 1 ){
                return den[0]*den[1]
            }
            
            if(!op){
                const sig = den[1]<0?-1:1
                return `\\frac{${sig*den[0]}}{${sig*den[1]}}`
            }else{
                const sig = den[0]*den[1]<0?'-':''
                return `${sig}\\frac{${Math.abs(den[0])}}{${Math.abs(den[1])}}`
            }
            
        },
        interpolate_mono: function(xs, ys) {
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
        },
          /*

function Max(x){
	var m=Math.min.apply(Math, x);
	var M=Math.max.apply(Math, x)
	
	if(M>(-m)){
		return M
	}else{
		return -m
	}
}

function simplify_frac(a){

	let mcd = mcd_new(a[0],a[1])
	mcd *= mcd*a[1]<0?-1:1
	return [a[0]/mcd,a[1]/mcd]
}

function texto(S,C){//*
	let Ct = document.createElement('span');
	Ct.textContent=S
	C.appendChild(Ct)
}
function divContenido(S,C){//*
	let Ct = document.createElement('div');
	Ct.innerHTML=S
	C.appendChild(Ct)
}
function spanContenido(S,C){//*
	let Ct = document.createElement('span');
	Ct.innerHTML=S
	C.appendChild(Ct)
}


function evaluar(expresion,X){
	const y = []
	X.forEach((x) => {
		y.push(eval(expresion));
	  });
	  return y
}
          */
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
        pruebas:{
            test: function() {
                console.log("works!")
            },
            test2: function() {
                console.log("works!2")
                tlacu.prueb2.test()
            },
        },
        prueb2:{
            test: function() {
                console.log("works pru!")
            },
            test2: function() {
                console.log("works pru!2")
                this.test()
            },
        },
    };
})();

  