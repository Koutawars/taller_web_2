$( document ).ready(
    function(){
        var props = [];
        props.push(new Propietario("Kevin", "Urieles", "Cra 7", "133246"));
        props.push(new Propietario("Carlos", "Campo", "Calle 10", "466563"));
        props[0].mascotas.push(new Mascota('Nasus', 'Perro', 'dic 6'));
        props[1].mascotas.push(new Mascota('Rengar', 'Gato', 'oct 6'));

        var propsSelect;

        function agregarPropietario(prop){
            let tr = document.createElement("tr");
            tr.setAttribute("name", props.indexOf(prop));
            let propie = "<td>"+prop.nombres+"</td>";
            propie += "<td>"+prop.apellidos+"</td>";
            propie += "<td>"+prop.direccion+"</td>";
            propie += "<td>"+prop.telefono+"</td>";
            propie += "<td>"+'<a class="det" name="'+props.indexOf(prop)+'">Ver detalles</a>'+"</td>";
            tr.innerHTML = propie;
            $("#listaprop").append(tr);
            let index = props.indexOf(prop);
            $('a[name='+index+']').click(function(){
                $("#nombres").val(props[index].nombres);
                $("#apellidos").val(props[index].apellidos);
                $('#direccion').val(props[index].direccion);
                $('#telefono').val(props[index].telefono);
                $('#listaMasc').html('');
                propsSelect = index;
                props[index].mascotas.forEach(masc => {
                    agregarMasc(masc);
                });
            });
        }

        $('#editar').click(function(){
            var nom  = $("#nombres").val();
            var ape  = $("#apellidos").val();
            var dir  = $('#direccion').val();
            var tel  = $('#telefono').val();
            if(nom != '' && ape != '' && dir != '' && tel != ''){
                props[propsSelect].nombres = nom;
                props[propsSelect].apellidos = ape;
                props[propsSelect].direccion = dir;
                props[propsSelect].telefono = tel;
                $('tr[name='+propsSelect+']').html('');
                let propie = "<td>"+props[propsSelect].nombres+"</td>";
                propie += "<td>"+props[propsSelect].apellidos+"</td>";
                propie += "<td>"+props[propsSelect].direccion+"</td>";
                propie += "<td>"+props[propsSelect].telefono+"</td>";
                propie += "<td>"+'<a class="det" name="'+propsSelect+'">Ver detalles</a>'+"</td>";
                $('tr[name='+propsSelect+']').html(propie);
                $('a[name='+propsSelect+']').click(function(){
                    propsSelect = $(this).attr("name");
                    $("#nombres").val(props[propsSelect].nombres);
                    $("#apellidos").val(props[propsSelect].apellidos);
                    $('#direccion').val(props[propsSelect].direccion);
                    $('#telefono').val(props[propsSelect].telefono);
                    $('#listaMasc').html('');
                    props[propsSelect].mascotas.forEach(masc => {
                        agregarMasc(masc);
                    });
                });
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

        props.forEach(function(prop){
            agregarPropietario(prop);
        });
    }
);