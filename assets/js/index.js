
        $("#navigation-button").click(function () {
            $("#notification-number").toggleClass("notification-hide");
            $(".nav-bar").toggleClass("nav-bar-hide");
            $(".bgblue").toggleClass("bgblue-show");
            $(".hamburger").toggleClass("is-active");
        });

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
        
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                    
                });
            });
        });