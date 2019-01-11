

up:
	@docker-compose build masmovil_order masmovil_phone
	@docker-compose up -d masmovil_order masmovil_phone


down:
	@docker-compose down



