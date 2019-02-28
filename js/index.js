$( document ).ready(
    function(){
        var props = [];
        props.push(new Propietario("Kevin", "Urieles", "Cra 7", "133246"));
        props.push(new Propietario("Carlos", "Campo", "Calle 10", "466563"));
        props[0].mascotas.push(new Mascota('Nasus', 'Perro', 'dic 6'));
        props[1].mascotas.push(new Mascota('Rengar', 'Gato', 'oct 6'));

        var propIndexNow;

        function agregarPropietario(prop){
            let tr = document.createElement("tr");
            let propie = "<td>"+prop.nombres+"</td>";
            propie += "<td>"+prop.apellidos+"</td>";
            propie += "<td>"+prop.direccion+"</td>";
            propie += "<td>"+prop.telefono+"</td>";
            propie += "<td>"+'<a class="add" name="'+props.indexOf(prop)+'">Agregar Mascota</a>'+"</td>";
            tr.innerHTML = propie;
            $("#listaprop").append(tr);
            let index = props.indexOf(prop);
            $('a[name='+index+']').click(function(){
                $('#agregarMasc').show();
                $('#nombreProp').html(props[index].nombres +" "+ props[index].apellidos);
                $('#listaMasc').html('');
                props[index].mascotas.forEach(masc => {
                    agregarMasc(masc);
                });
                propIndexNow = index;
            });
        }

        $('#agregarMascota').click(function(){
            let nombre = $('#nombre').val();
            let tipo = $('#tipo').val();
            let fecha = $('#fecha').val();
            if(nombre != '' && tipo != '' && fecha != ''){
                let mascota = new Mascota(nombre, tipo, fecha);
                props[propIndexNow].mascotas.push(mascota);
                agregarMasc(mascota);
                $('#nombre').val('');
                $('#tipo').val('');
                $('#fecha').val('');
            }
        });

        function agregarMasc(masc){
            let tr = document.createElement("tr");
            let text = "<td>"+masc.nombre+"</td>";
            text += "<td>"+masc.tipo+"</td>";
            text += "<td>"+masc.fecha+"</td>";
            tr.innerHTML = text;
            $("#listaMasc").append(tr);
        }

        // agrega a la tabla los propietario del vector
        props.forEach(function(prop){
            agregarPropietario(prop);
        });

        $("#agregar").click(function(){
            var nombre = $("#nombres").val();
            var apellido = $("#apellidos").val();
            var dir = $('#direccion').val();
            var tel = $('#telefono').val();
            if(nombre != '' && apellido != '' && dir != '' && tel != ''){
                let nuevoprop = new Propietario(nombre, apellido, dir, tel);
                props.push(nuevoprop);
                agregarPropietario(nuevoprop);
                $("#nombres").val('');
                $("#apellidos").val('');
                $('#direccion').val('');
                $('#telefono').val('');
            }
        });
        $('select').formSelect();
        $('.datepicker').datepicker();
        $('#agregarMasc').hide();
    }
);