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
           console.log(vmin,vmax,step)
            let list=[Math.floor(vmin/step)*step]
            console.log(list)
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
        multiply: function (a1, a2) {//Descartado
            //para polinomios
            var result = [];
            a1.forEach(function (a, i) {
                a2.forEach(function (b, j) {
                    result[i + j] = (result[i + j] || 0) + a * b;
                });
            });
            return result;
        },
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
        poli:{
            simplificar: function (v){
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
            derivate: function (v){
                const n=v.length-1
                const d=[]
                for(var k=0;k<n;++k){
                    d.push(v[k]*(n-k))
                }
                return d
            },
            eval: function (v,x){//Solo un valor
                let y=0
                for(var k=0;k<v.length;++k){
                    y += v[k]*x**(v.length-k-1)
                }
                return y
            },
            raiz: function (a,b,discriminante,p,q){//a/b*discriminante^(p/q)
                    
                    if(p>0){
                        if(b==1)  return `$ ${(a<0?'-':'')} ${(Math.abs(a)==1?'':Math.abs(a))} \\sqrt[${(q==2?'':q)}]{${discriminante}^{${p==1?'':p}}} $`
                        else return `$${(a<0?'-':'')} \\frac{ ${(Math.abs(a)==1?'':Math.abs(a))} \\sqrt[${(q==2?'':q)}]{${discriminante}^{${p==1?'':p}}}}{${b}}$`
                    }else{
                        return `$${(a<0?'-':'')} \\frac{${Math.abs(a)}} { ${b==1?"":b}\\sqrt[${(q==2?'':q)}]{${discriminante}^{${p==-1?'':-p}}}}$`
                    }/*else if(p>0){
                        return `$\\frac{${a}\\sqrt[${q}]{${discriminante}^{${p}}}}{${b}} $`
                    }if( a==1 && b==1){
                        return `$\\frac{1}{\\sqrt[${(q==2?'':q)}]{${discriminante}^{${p}}}}$`
                    }else if(b==1){
                        return `$${a} \\sqrt[${q}]{${discriminante}^{${p}}}$`
                    }else{//${tlacu.poli.raiz(2, 3, 'x', -6, 7)}
                        return `$\\frac{${a}}{${b}\\sqrt[${q}]{${discriminante}^{${-p}}}} $`
                    }*/
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
                        S=`${v[0][0]*v[0][1]<0?"-":""} \\frac{${Math.abs(v[0][0])}}{${Math.abs(v[0][1])}} x`
                    }else{
                        S=`${v[0]<0?"-":""} ${Math.abs(v[0])==1?'':Math.abs(v[0])} x`
                    }
                }else{
                    if(Array.isArray(v[0])){//Fracción
                        S=`${v[0][0]*v[0][1]<0?"-":""} \\frac{${Math.abs(v[0][0])}}{${Math.abs(v[0][1])}} x^{${n-1}}`
                    }else{
                        S=`${v[0]<0?"-":""} ${Math.abs(v[0])==1?'':Math.abs(v[0])} x^{${n-1}}`
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
                return S
            }
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

  