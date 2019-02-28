$( document ).ready(
    function(){
        var props = [];
        props.push(new Propietario("Kevin", "Urieles", "Cra 7", "133246"));
        props.push(new Propietario("Carlos", "Campo", "Calle 10", "466563"));

        function agregarPropietario(prop){
            let tr = document.createElement("tr");
            let propie = "<td>"+prop.nombres+"</td>";
            propie += "<td>"+prop.apellidos+"</td>";
            propie += "<td>"+prop.direccion+"</td>";
            propie += "<td>"+prop.telefono+"</td>";
            propie += "<td>"+'<a class="add" name="'+props.indexOf(prop)+'">Agregar Mascota</a>'+"</td>";
            tr.innerHTML = propie;
            $("#listaprop").append(tr);
        }

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
            }
        });

    }
);