import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class TermsAndCond extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="home-terms-and-cond">
        <div className="text-div-content-inner">
          <h5>Terminos y Condiciones</h5>

          <p>
          ¡Te damos la bienvenida a Needdly! Needdly desarrolla tecnologías y servicios que
            permiten a las personas conectarse entre sí, establecer comunidades y hacer crecer sus
            empresas. Estas Condiciones rigen el uso de Needdly, Messenger y los productos, las
            funcionalidades, las aplicaciones, los servicios, las tecnologías y el software que
            ofrecemos (los Productos de Needdly o Productos), excepto cuando indiquemos
            expresamente que se aplican otras condiciones distintas de estas. Needdly Ireland
            Limited es quien te proporciona estos Productos. No te cobramos por el uso de Needdly
            ni del resto de los productos y servicios que se incluyen en estas Condiciones. En su
            lugar, las empresas y organizaciones nos pagan por mostrarte publicidad sobre sus
            productos o servicios. Al usar nuestros Productos, aceptas que te mostremos anuncios que
            consideremos relevantes para ti y tus intereses. Para determinar estos anuncios, usamos
            tus datos personales. No vendemos tus datos personales a los anunciantes ni compartimos
            ningún tipo de información con ellos que te identifique directamente (como tu nombre,
            dirección de correo electrónico u otros datos de contacto), a menos que nos des permiso
            específico. En su lugar, los anunciantes nos proporcionan información, como el tipo de
            audiencia a la que quieren llegar con sus anuncios, y nosotros los mostramos a las
            personas que puedan estar interesadas en ellos. Asimismo, ofrecemos a los anunciantes
            informes sobre el rendimiento de su publicidad a fin de que sepan de qué manera
            interactúan las personas con su contenido. Consulta la Sección 2 a continuación para
            obtener más información al respecto. En nuestra Política de datos se detalla cómo
            recopilamos y usamos tus datos personales para determinar algunos de los anuncios que
            ves y poder ofrecer el resto de los servicios que se describen a continuación. En la
            configuración, también puedes revisar cuando quieras las opciones de privacidad de que
            dispones para determinar el uso que hacemos de tus datos. 1. Los servicios que ofrecemos
            Nuestro objetivo es dar a las personas la posibilidad de crear comunidades y hacer del
            mundo un lugar más conectado y, para ello, ponemos a tu disposición los Productos y
            servicios que se describen a continuación: Te proporcionamos una experiencia
            personalizada: Tus experiencias en Needdly son distintas de las del resto de personas
            que usan la plataforma: desde las publicaciones, las historias, los eventos, los
            anuncios y otros contenidos que ves en la sección de noticias o en nuestra plataforma de
            vídeo, hasta las páginas que sigues y otras funciones funcionalidades que quizás usas,
            como Tendencias, Marketplace y la búsqueda. Usamos los datos que tenemos, por ejemplo,
            los relativos a las conexiones que entablas, las opciones y los ajustes de configuración
            que seleccionas, el tipo de contenido que compartes y las acciones que llevas a cabo en
            nuestros Productos o fuera de ellos para personalizar tu experiencia. Te conectamos con
            las personas y las organizaciones que te interesan: Te ayudamos a encontrar personas,
            grupos, empresas, organizaciones y otras entidades que te interesan, así como a
            conectarte con ellos por medio de los Productos de Needdly que usas. En función de los
            datos que tenemos, te ofrecemos sugerencias a ti y a otras personas, tales como grupos a
            los que unirte, eventos a los que asistir, páginas que seguir o a las que enviar
            mensajes, programas que ver y personas que quizás quieras incluir en tu lista de amigos.
            Las comunidades funcionan mejor cuanto más estrechos son los lazos que unen a sus
            miembros, por eso creemos que nuestros servicios son más útiles si las personas se
            conectan con gente, grupos y organizaciones que les interesan. Ayudarte a expresar tu
            opinión y hablar sobre temas que te importan: En Needdly puedes expresarte y
            comunicarte con amigos, familiares y otras personas que te importan de distintas
            maneras. Por ejemplo, puedes compartir actualizaciones de estado, fotos, vídeos e
            historias en los diversos Productos de Needdly que usas, enviar mensajes a un amigo o a
            varias personas, crear eventos o grupos, o añadir contenido a tu perfil. También hemos
            desarrollado, y seguimos buscando, nuevas formas de usar la tecnología, como la realidad
            aumentada y los vídeos de 360°, para crear y compartir contenido más expresivo y
            atractivo en Needdly. Te ayudamos a descubrir contenido, productos y servicios que
            pueden interesarte: Te mostramos anuncios, ofertas y otro contenido patrocinado para que
            descubras el contenido, los productos y los servicios que ofrecen los numerosos negocios
            y organizaciones que usan Needdly y los Productos de Needdly. En la Sección 2 se
            explica este aspecto con más detalle. Combatimos las conductas perjudiciales, y
            protegemos y apoyamos a nuestra comunidad: Las personas solo crearán comunidades en
            Needdly si se sienten seguras. Contamos con equipos especializados en todo el mundo y
            desarrollamos sistemas técnicos avanzados para detectar si nuestros Productos se usan de
            forma inapropiada, si alguien muestra una conducta perjudicial para los demás y si
            surgen situaciones en las que podamos contribuir para ayudar o proteger a nuestra
            comunidad. Si tenemos constancia de contenido o conductas de este tipo, aplicaremos las
            medidas correspondientes, tales como ofrecer ayuda, eliminar el contenido, bloquear el
            acceso a ciertas funcionalidades, inhabilitar una cuenta o ponernos en contacto con los
            órganos encargados de hacer cumplir la ley. . Compartimos datos con otras Empresas de
            Needdly si detectamos que una persona usa alguno de nuestros Productos de forma
            inadecuada o muestra una conducta inapropiada. Usamos y desarrollamos tecnologías
            avanzadas para ofrecer servicios seguros y funcionales a todo el mundo: Usamos y
            desarrollamos tecnologías avanzadas, tales como inteligencia artificial, sistemas de
            machine learning y realidad aumentada, para que la gente pueda usar nuestros Productos
            de manera segura, independientemente de su capacidad física o la región geográfica donde
            se encuentre. Por ejemplo, este tipo de tecnología indica a las personas con problemas
            de visión qué elemento o persona aparece en las fotos o los vídeos que se comparten en
            Needdly o Instagram. También creamos una red sofisticada y desarrollamos tecnología de
            comunicación para que las personas en áreas con acceso limitado a internet puedan
            conectarse. Asimismo, desarrollamos sistemas automatizados destinados a mejorar nuestra
            capacidad de detectar y eliminar actividades abusivas o peligrosas que puedan perjudicar
            a nuestra comunidad y dañar la integridad de nuestros Productos. Realizamos estudios
            para detectar formas de mejorar nuestros servicios: Llevamos a cabo tareas de
            investigación con el propósito de desarrollar, probar y mejorar nuestros Productos.
            Entre estas tareas, se incluye el análisis de los datos que tenemos sobre nuestros
            usuarios y la comprensión del uso que hacen de nuestros Productos, por ejemplo, mediante
            la realización de encuestas y pruebas, y la solución de problemas con las nuevas
            funcionalidades. En nuestra Política de datos se detalla el uso que hacemos de los datos
            para llevar a cabo estas tareas con el propósito de desarrollar y mejorar nuestros
            servicios. Proporcionamos experiencias coherentes y fluidas en los Productos de las
            empresas de Needdly: nuestros Productos te ayudan a encontrar personas, grupos,
            empresas, organizaciones y otras entidades que son importantes para ti, y contribuyen a
            conectarte con ellos. Diseñamos nuestros sistemas para que tu experiencia sea coherente
            y fluida en los distintos Productos de las empresas de Needdly que usas. Por ejemplo,
            usamos los datos de las personas con las que interactúas en Needdly para que te resulte
            más fácil conectarte con ellas en Messenger o Instagram, y ponemos Messenger a tu
            disposición para que te comuniques con las empresas que sigues en Needdly. Ofrecemos
            acceso a nuestros servicios desde cualquier lugar del mundo: para operar nuestro
            servicio internacional, debemos almacenar y distribuir contenido y datos en nuestros
            centros de datos y sistemas de todo el mundo, incluidas regiones fuera de tu país de
            residencia. Estas infraestructuras pueden estar dirigidas o gestionadas por Needdly,
            Inc., Needdly Ireland Limited o las empresas del grupo. 2. Cómo se financian nuestros
            servicios En lugar de pagar por usar Needdly y el resto de los productos y servicios
            que ofrecemos, al usar los Productos de Needdly que se incluyen en estas Condiciones,
            aceptas que podamos mostrarte anuncios de las empresas y organizaciones que nos pagan
            por promocionarse dentro y fuera de los Productos de las empresas de Needdly. Usamos
            tus datos personales, como la información sobre tu actividad y tus intereses, para
            mostrarte aquella publicidad que pueda resultarte más relevante. Nuestro sistema
            publicitario se ha diseñado pensando en la protección de la privacidad. Esto quiere
            decir que podemos mostrarte anuncios relevantes y útiles sin revelar tu identidad a los
            anunciantes. No vendemos tus datos personales. Permitimos que los anunciantes nos
            proporcionen información como sus objetivos empresariales y el tipo de audiencia a la
            que quieren llegar con sus anuncios (por ejemplo, amantes del ciclismo de 18 a 35 años).
            De esta manera, podemos mostrar sus anuncios a las personas que podrían estar
            interesadas en ellos. Asimismo, ofrecemos a los anunciantes informes sobre el
            rendimiento de su publicidad a fin de que sepan de qué manera interactúan las personas
            con su contenido dentro y fuera de Needdly. Proporcionamos a los anunciantes datos
            demográficos generales e información sobre intereses (por ejemplo, que una mujer de
            entre 25 y 34 años que vive en Madrid y a la que le interesa la ingeniería de software
            ha visto su anuncio). Estos datos tienen como fin ayudarlos a conocer mejor su
            audiencia. No compartimos información que te identifique directamente (datos como tu
            nombre o dirección de correo electrónico, que se pueden utilizar para ponerse en
            contacto contigo o para identificar quién eres), a menos que nos des permiso específico
            para ello. Obtén más información sobre el funcionamiento de los anuncios de Needdly
            aquí. Recopilamos y usamos tus datos personales para ofrecerte los servicios descritos
            anteriormente. Para obtener más información sobre cómo recopilamos y usamos tus datos,
            consulta nuestra Política de datos. Dispones de controles para establecer los tipos de
            anuncios o anunciantes que ves, así como los tipos de información que usamos para
            determinar los anuncios que te mostramos. Más información. 3. Tus compromisos con
            Needdly y nuestra comunidad Ponemos a tu disposición y la de otras personas estos
            servicios con el objetivo de cumplir con nuestro propósito. A cambio, debes
            comprometerte con nosotros a lo siguiente: Quién puede usar Needdly Queremos que
            nuestra comunidad sea un entorno seguro en el que las personas se responsabilicen de sus
            opiniones y sus acciones. Por este motivo, debes: Usar el mismo nombre que utilizas en
            tu vida diaria. Proporcionar información exacta sobre ti. Crear solo una cuenta (propia)
            y usar la biografía para fines personales. No compartir tu contraseña ni dar acceso a
            otras personas a tu cuenta de Needdly, ni transferirles tu cuenta (sin nuestro
            permiso). Intentamos que Needdly esté disponible para todo el mundo, pero no puedes
            usar Needdly en los siguientes casos: Eres menor de 14 años. Se te ha condenado por
            delitos sexuales. Hemos inhabilitado tu cuenta con anterioridad por haber infringido
            nuestras Condiciones o Políticas. La legislación aplicable prohíbe que accedas a
            nuestros productos, servicios o software. Qué puedes hacer y qué puedes compartir en
            Needdly Queremos que la gente use Needdly para expresarse y compartir contenido que le
            resulte relevante, pero no a costa de la seguridad y el bienestar de otras personas ni
            de la integridad de nuestra comunidad. Por lo tanto, aceptas no participar en las
            conductas que se describen a continuación ni ayudar (o apoyar a otras personas en estos
            comportamientos). No debes usar nuestros Productos para realizar acciones o compartir
            contenido en los siguientes casos: Si infringen estas Condiciones, nuestras Normas
            comunitarias u otras condiciones y políticas que rijan tu uso de Needdly. Si son
            ilegales, engañosos, discriminatorios o fraudulentos. Si se infringen los derechos de
            otras personas, como los relativos a la propiedad intelectual. No debes subir virus o
            códigos maliciosos, ni realizar actividades que puedan inhabilitar, sobrecargar o
            alterar el correcto funcionamiento de nuestros Productos, ni modificar su aspecto. No
            debes acceder a datos de nuestros Productos o recopilarlos con medios automatizados (sin
            nuestro permiso previo), ni intentar acceder a ellos sin el permiso correspondiente.
            Podemos eliminar o bloquear todo el contenido que incumpla las presentes disposiciones.
            Si retiramos contenido que has compartido debido al incumplimiento de nuestras Normas
            comunitarias, te informaremos de esta medida y te explicaremos las opciones de que
            dispones para solicitar otra revisión, a menos que infrinjas de manera grave o repetida
            estas Condiciones o, si al hacerlo, nos exponemos o exponemos a terceras personas a
            responsabilidades legales; nuestra comunidad de usuarios se ve perjudicada; se
            compromete o pone en riesgo la integridad o el funcionamiento de nuestros servicios,
            sistemas o Productos; también en los casos en los que experimentemos restricciones por
            motivos técnicos, o bien en aquellos en los que no tengamos permiso para hacerlo por
            motivos legales. Para contribuir al correcto funcionamiento de la comunidad, te
            recomendamos que denuncies cualquier contenido o comportamiento que consideres que
            infringe tus derechos (incluidos los derechos de propiedad intelectual) o nuestras
            condiciones y políticas. Permisos que nos concedes Para proporcionar nuestros servicios,
            necesitamos que nos concedas determinados permisos: Permiso para usar el contenido que
            creas y compartes: hay contenido que compartes o subes, como fotos o vídeos, que puede
            estar protegido por leyes en materia de propiedad intelectual o industrial. Eres el
            propietario de los derechos de propiedad intelectual o industrial (como derechos de
            autor o marcas) del contenido que creas y compartes en Needdly y en los Productos de
            las empresas de Needdly que uses. Ninguna disposición de las presentes Condiciones te
            priva de los derechos que tienes sobre el contenido de tu propiedad. Puedes compartir
            libremente tu contenido con quien quieras y donde desees. No obstante, para poder
            ofrecer nuestros servicios, debes concedernos algunos permisos legales (denominados
            “licencias”) a fin de usar dicho contenido. Emplearemos estas licencias únicamente para
            ofrecer y mejorar nuestros Productos y servicios, tal y como se describe en la Sección 1
            anterior. En concreto, cuando compartes, publicas o subes contenido que se encuentra
            protegido por derechos de propiedad intelectual o industrial en nuestros Productos, o en
            relación con ellos, nos concedes una licencia en todo el mundo, no exclusiva,
            transferible, sublicenciable y exenta de pagos por derechos de autor para alojar, usar,
            distribuir, modificar, mantener, reproducir, mostrar o comunicar públicamente y traducir
            tu contenido, así como para crear contenido derivado (de conformidad con tu
            configuración de privacidad y de la aplicación). En otras palabras, si compartes una
            foto en Needdly, nos das permiso para almacenarla, copiarla y compartirla con otros (de
            conformidad con tu configuración), como proveedores de servicios que nos ayudan a
            proporcionar nuestros servicios u otros productos de Needdly que usas. Esta licencia
            dejará de tener efecto cuando tu contenido se elimine de nuestros sistemas. Tu contenido
            puede eliminarse individualmente, aunque también tienes la opción de eliminar tu cuenta
            para suprimirlo todo de una sola vez. Obtén más información sobre cómo eliminar tu
            cuenta. Tienes la opción de descargar una copia de tus datos cuando quieras antes de
            eliminar la cuenta. Cuando elimines tu contenido, el resto de los usuarios dejarán de
            verlo, pero seguirá alojado en nuestros sistemas en los siguientes supuestos: No se
            puede eliminar inmediatamente debido a limitaciones técnicas (en cuyo caso, tu contenido
            se eliminará en un plazo máximo de 90 días desde que decides eliminarlo). Otras personas
            han usado tu contenido de acuerdo con esta licencia, pero no lo han eliminado (en cuyo
            caso, esta licencia seguirá en vigor hasta que el contenido se retire). La eliminación
            inmediata del contenido limitaría nuestra posibilidad de: Investigar o detectar
            prácticas ilegales o infracciones de nuestras condiciones y políticas (por ejemplo, un
            uso incorrecto de nuestros Productos o sistemas). Cumplir con cualquier obligación
            legal, como la protección de pruebas. Cumplir con los requerimientos de autoridades
            judiciales, administrativas o policiales, así como de organismos gubernamentales. En tal
            caso, el contenido se almacenará durante el tiempo necesario para cumplir las
            finalidades para las que se ha conservado (el plazo de tiempo exacto variará en función
            de los distintos casos). En los casos mencionados anteriormente, esta licencia seguirá
            en vigor hasta que el contenido se elimine por completo. Permiso para usar tu nombre, tu
            foto del perfil e información sobre las acciones que realizas en anuncios y contenido
            patrocinado: Nos concedes permiso para usar tu nombre, tu foto del perfil e información
            sobre las acciones que realizas en Needdly junto a o en relación con anuncios, ofertas
            y otro contenido patrocinado que mostramos en nuestros Productos, sin recibir
            compensación de ningún tipo. Por ejemplo, podemos mostrar a tus amigos que te interesa
            un evento promocionado o que te gusta una página creada por una marca que nos paga para
            mostrar sus anuncios en Needdly. Este tipo de anuncios solo se muestra a las personas
            que tienen tu permiso para ver las acciones que realizas en Needdly. Obtén más
            información sobre la configuración y las preferencias de anuncios. Permiso para
            actualizar el software que usas o descargas: si descargas o usas nuestro software, nos
            das permiso para descargar e instalar las actualizaciones correspondientes cuando
            proceda. Limitaciones de uso de nuestra propiedad intelectual Si utilizas contenido
            protegido por nuestros derechos de propiedad intelectual y/o industrial que ponemos a
            disposición en nuestros Productos (como imágenes, diseños, vídeos o sonido que ofrecemos
            y que tú añades al contenido que creas o compartes en Needdly), conservamos todos los
            derechos correspondientes a ese contenido (pero no al tuyo). Solo puedes usar nuestro
            contenido protegido por derechos de autor, o nuestras marcas o similares, según lo
            establecido en nuestras Normas de uso de marcas, o bien con nuestro consentimiento por
            escrito. Debes obtener nuestro permiso por escrito (o contar con uno en virtud de una
            licencia de código abierto) para modificar, descompilar o intentar extraer de algún otro
            modo nuestro código fuente, así como crear obras derivadas a partir de él. 4.
            Disposiciones adicionales Actualización de las Condiciones Trabajamos continuamente para
            perfeccionar nuestros servicios y desarrollar nuevas funcionalidades a fin de
            proporcionaros tanto a ti como a nuestra comunidad mejores Productos. Por este motivo,
            es posible que debamos actualizar estas Condiciones cada cierto tiempo para reflejar con
            precisión nuestros servicios y prácticas. Solo implementaremos cambios si las
            disposiciones ya no son adecuadas o están incompletas, y únicamente si dichas
            modificaciones son razonables y tienen en debida cuenta tus intereses. A menos que la
            ley nos exija realizar estas modificaciones, te enviaremos una notificación (por
            ejemplo, por correo electrónico o mediante nuestros Productos) con 30 días de antelación
            como mínimo antes de modificar estas Condiciones, de modo que puedas revisar los cambios
            antes de que entren en vigor. Si continúas usando nuestros Productos una vez que los
            cambios hayan entrado en vigor, significará que aceptas estas modificaciones. Aunque
            esperamos que sigas usando nuestros Productos, si no estás de acuerdo con nuestras
            Condiciones actualizadas y no quieres seguir formando parte de la comunidad de Needdly,
            puedes eliminar tu cuenta en cualquier momento. Suspensión o cancelación de la cuenta
            Queremos que Needdly sea un espacio donde las personas se sientan cómodas y seguras
            para decir lo que piensan y compartir opiniones e ideas. Si determinamos que has
            infringido nuestras condiciones o políticas, especialmente nuestras Normas comunitarias,
            de manera notoria o grave, o en reiteradas ocasiones, es posible que suspendamos o
            inhabilitemos definitivamente tu cuenta. También es posible que lo hagamos si infringes
            reiteradamente los derechos de propiedad intelectual de otras personas o si nos vemos
            obligados a ello por motivos legales. Si procedemos a suspender o inhabilitar tu cuenta,
            te informaremos al respecto y te explicaremos las opciones de las que dispones para
            solicitar una revisión, a menos que, al hacerlo, nos expongamos a nosotros o a terceras
            personas a responsabilidades legales; nuestra comunidad de usuarios se vea perjudicada;
            se comprometa o ponga en riesgo la integridad o el funcionamiento de nuestros servicios,
            sistemas o Productos; también en los casos en los que experimentemos restricciones por
            motivos técnicos, o bien en aquellos en los que no tengamos permiso para hacerlo por
            motivos legales. Obtén más información sobre lo que puedes hacer si se ha inhabilitado
            tu cuenta y cómo ponerte en contacto con nosotros si consideras que la hemos
            inhabilitado por error. Si eliminas tu cuenta o nosotros la inhabilitamos, el acuerdo
            establecido mediante estas Condiciones dejará de aplicarse, pero las siguientes
            disposiciones continuarán estando vigentes: 3.3.1, 4.2-4.5. Limitación de
            responsabilidad Ninguna de las disposiciones de las presentes Condiciones tiene como
            finalidad eximirnos de responsabilidad ni limitarla en casos de defunción, lesiones
            personales o representación fraudulenta derivados de una negligencia por nuestra parte,
            ni tampoco afectar a tus derechos legales. Actuaremos con diligencia profesional a la
            hora de ofrecerte nuestros Productos y servicios y de mantener un entorno seguro y libre
            de errores. Siempre y cuando hayamos actuado con diligencia profesional, no nos hacemos
            responsables de las pérdidas no provocadas por nuestro incumplimiento de estas
            Condiciones o por nuestras acciones; las pérdidas que ni nosotros ni tú podamos prever
            en el momento de la entrada en vigor de estas Condiciones, ni los acontecimientos que no
            podemos controlar. Disputas Intentamos establecer reglas claras para reducir y, a ser
            posible, evitar las disputas entre tú y nosotros. No obstante, si surge alguno, es útil
            saber con antelación dónde se puede resolver y qué leyes se aplican. Si eres consumidor
            y tu residencia habitual se encuentra en un estado miembro de la Unión Europea, las
            leyes de dicho país se aplicarán a cualquier reclamación, causa o disputa que inicies
            contra nosotros y que surja como consecuencia de estas Condiciones o los Productos de
            Needdly, o en relación con ellos (“reclamación”). Asimismo, puedes resolver la
            reclamación en cualquier tribunal competente del país que tenga jurisdicción. En todos
            los demás casos, aceptas que la reclamación debe resolverse en un tribunal competente en
            la República de Irlanda y que las leyes de dicho país regirán estas Condiciones y
            cualquier reclamación (independientemente de las disposiciones relativas a conflictos de
            derecho). Otros Estas Condiciones (anteriormente denominadas Declaración de derechos y
            responsabilidades) constituyen la totalidad del acuerdo entre tú y Needdly Ireland
            Limited respecto del uso que hagas de nuestros Productos y prevalecen sobre cualquier
            acuerdo anterior. Algunos de los Productos que ofrecemos también se rigen por
            condiciones complementarias. Si usas cualquiera de estos Productos, tendrás la
            oportunidad de aceptar las condiciones complementarias que formarán parte del acuerdo
            que tengamos contigo. Por ejemplo, si accedes a nuestros Productos o los usas para fines
            comerciales o empresariales, como para comprar anuncios, vender productos, desarrollar
            aplicaciones, administrar un grupo o una página para tu empresa o usar nuestros
            servicios de medición, debes aceptar nuestras Condiciones comerciales. Si publicas o
            compartes contenido que incluya música, debes cumplir con nuestras Normas de contenido
            musical. En la medida en que las condiciones complementarias entren en conflicto con
            estas Condiciones, las primeras prevalecerán en lo que se refiere a dicho conflicto. Si
            cualquier parte de estos términos no fuese aplicable, la parte restante seguirá siendo
            de plena aplicación y vigencia. La no aplicación de alguna de estas Condiciones por
            nuestra parte no se considerará una renuncia. Cualquier modificación de estas
            Condiciones o renuncia respecto a ellas deberá hacerse por escrito y contar con nuestra
            firma. No transferirás ninguno de tus derechos u obligaciones en virtud de estas
            Condiciones a ningún tercero sin nuestro consentimiento. Puedes designar a una persona
            (denominada “contacto de legado”) para que administre tu cuenta si esta se convierte en
            conmemorativa. Solo el contacto de legado o una persona que hayas designado en un
            testamento válido o documento similar en el que expreses claramente tu consentimiento de
            divulgar el contenido en caso de fallecimiento o incapacidad podrá solicitar que se
            divulgue contenido de tu cuenta una vez que esta pase a ser conmemorativa. Estas
            Condiciones no confieren derechos de beneficiario a ningún tercero. Todos nuestros
            derechos y obligaciones según estas Condiciones son asignables libremente por nosotros
            en relación con una fusión, adquisición o venta de activos, o bien en virtud de la ley o
            de cualquier otro modo. Te informamos que cabe la posibilidad de que tengamos que
            cambiar el nombre de usuario de tu cuenta en determinadas circunstancias (por ejemplo,
            si otra persona lo reclama y no parece guardar relación con el nombre que usas en tu
            vida cotidiana). Si nos vemos obligados a hacerlo, te lo comunicaremos con antelación y
            te explicaremos los motivos de nuestra decisión. Valoramos siempre tus comentarios y
            cualquier otra sugerencia sobre nuestros productos y servicios. No obstante, te
            informamos de que podemos usarlos sin restricción ni obligación alguna de ofrecerte una
            compensación, así como tampoco tenemos la obligación de considerarlos confidenciales. 5.
            Otras condiciones y políticas que pueden aplicarse en tu caso Normas comunitarias: En
            estas directrices se describen nuestras normas en relación con el contenido que publicas
            en Needdly y con tu actividad en Needdly y en otros Productos de Needdly. Condiciones
            comerciales: Estas Condiciones se aplican si también accedes a nuestros Productos o los
            usas con fines comerciales o empresariales, por ejemplo, para realizar actividades de
            publicidad, gestionar una aplicación desde nuestra plataforma, usar nuestros servicios
            de medición, administrar el grupo o la página de una empresa, o vender bienes y
            servicios. Políticas de publicidad: en estas políticas se describen los tipos de
            contenido publicitario que admiten los socios que muestran anuncios por medio de los
            Productos de Needdly. Condiciones de los anuncios de autoservicio: Estas condiciones se
            aplican cuando usas las interfaces publicitarias de autoservicio para crear, presentar o
            entregar anuncios u otra actividad o contenido de carácter comercial o patrocinado.
            Política de páginas, grupos y eventos: Estas directrices se aplican si creas o
            administras una página, un grupo o un evento de Needdly, o bien si usas la plataforma
            como medio para difundir o administrar una promoción. Política de la plataforma de
            Needdly: En estas directrices se describen las políticas que rigen el uso de nuestra
            plataforma, (por ejemplo, en el caso de desarrolladores u operadores de una aplicación o
            un sitio web de la plataforma o de quienes usen plugins sociales). Condiciones de pago
            para desarrolladores: Estas condiciones se aplican a desarrolladores de aplicaciones que
            usan los pagos de Needdly. Condiciones de pagos de la comunidad: Estas Condiciones se
            aplican a todos los pagos que se realicen en Needdly o a través de la plataforma.
            Políticas de comercio: En estas directrices se describen las políticas que se aplican
            cuando pones a la venta productos y servicios en Needdly. Recursos relacionados con las
            marcas de Needdly: En estas directrices se describen las políticas que se aplican a las
            marcas, los logotipos y las capturas de pantalla de Needdly. Normas de contenido
            musical: En estas directrices se describen las políticas que se aplican si publicas o
            compartes contenido que incluye música en Needdly.
          </p>
        </div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TermsAndCond);
